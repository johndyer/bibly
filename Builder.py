import sys
import os
import shutil



bibly_files = []
bibly_files.append('bible.js')
bibly_files.append('bible.reference.js')
bibly_files.append('bibly.js')

bibly_filename = 'bibly'
bibly_version = '0.8'
bibly_version_path = 'build/' + bibly_version + '/'
bibly_active_path = 'build/'

if os.path.exists(bibly_version_path) == 0:
	os.mkdir(bibly_version_path)

# JavaScript
 
biblyjs = bibly_filename + '.js'
biblyjs_min = bibly_filename + '.min.js'

# combine files
code = ''
for item in bibly_files:
	src_file = open(item,'r')
	code += src_file.read() + "\n"

# write to output
tmp_file = open(bibly_version_path + biblyjs,'w')
tmp_file.write(code)
tmp_file.close()

# copy versioned file to active path
shutil.copy2(bibly_version_path + biblyjs, bibly_active_path + biblyjs)

# create minified and copy it
os.system('java -jar compiler.jar --js ' + bibly_version_path + biblyjs + ' --js_output_file ' + bibly_version_path + biblyjs_min)
os.system('java -jar yuicompressor-2.4.2.jar ' + bibly_version_path + biblyjs + ' -o ' + bibly_version_path +  biblyjs_min + '.yui --charset utf-8 -v')
shutil.copy2(bibly_version_path + biblyjs_min , bibly_active_path + biblyjs_min)

# CSS files

biblycss = bibly_filename + '.css'
biblycss_min = bibly_filename + '.min.css'

shutil.copy2(biblycss, bibly_version_path + biblycss)
shutil.copy2(bibly_version_path + biblycss, bibly_active_path + biblycss)

os.system('java -jar yuicompressor-2.4.2.jar ' + biblycss + ' -o ' + bibly_version_path + biblycss_min + ' --charset utf-8 -v')
shutil.copy2(bibly_version_path + biblycss_min , bibly_active_path + biblycss_min)



# PREPEND intros
def addHeader(headerFilename, filename):

	# get the header text
	tmp_file = open(headerFilename)
	header_txt = tmp_file.read();
	tmp_file.close()

	# read the current contents of the file
	tmp_file = open(filename)
	file_txt = tmp_file.read()
	tmp_file.close()
	
	# open the file again for writing
	tmp_file = open(filename, 'w')
	tmp_file.write(header_txt)
	# write the original contents
	tmp_file.write(file_txt)
	tmp_file.close()


addHeader('bibly.copyright.js', bibly_version_path + biblyjs)
addHeader('bibly.copyright.js', bibly_active_path + biblyjs)
addHeader('bibly.copyright.js', bibly_version_path + biblyjs_min)
addHeader('bibly.copyright.js', bibly_active_path + biblyjs_min)


addHeader('bibly.copyright.css', bibly_version_path + biblycss)
addHeader('bibly.copyright.css', bibly_active_path + biblycss)
addHeader('bibly.copyright.css', bibly_version_path + biblycss_min)
addHeader('bibly.copyright.css', bibly_active_path + biblycss_min)