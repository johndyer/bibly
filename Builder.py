import sys
import os
import shutil

bibly_filename = 'bibly'
bibly_version = '0.3'
bibly_version_path = 'build/' + bibly_version + '/'
bibly_active_path = 'build/'

if os.path.exists(bibly_version_path) == 0:
	os.mkdir(bibly_version_path)

# JavaScript
 
biblyjs = bibly_filename + '.js'
biblyjs_min = bibly_filename + '.min.js'

shutil.copy2(biblyjs, bibly_version_path + biblyjs)
shutil.copy2(bibly_version_path + biblyjs, bibly_active_path + biblyjs)

os.system('java -jar compiler.jar --js ' + biblyjs + ' --js_output_file ' + bibly_version_path + biblyjs_min)
shutil.copy2(bibly_version_path + biblyjs_min , bibly_active_path + biblyjs_min)

# CSS files

biblycss = bibly_filename + '.css'
biblycss_min = bibly_filename + '.min.css'

shutil.copy2(biblycss, bibly_version_path + biblycss)
shutil.copy2(bibly_version_path + biblycss, bibly_active_path + biblycss)

os.system('java -jar yuicompressor-2.4.2.jar ' + biblycss + ' -o ' + bibly_version_path + biblycss_min + ' --charset utf-8 -v')
shutil.copy2(bibly_version_path + biblycss_min , bibly_active_path + biblycss_min)