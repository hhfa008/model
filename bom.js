var fs = require('fs');
var path = "src";


function readDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        var files = fs.readdirSync(dirPath);

        files.forEach(function(file) {
            var filePath = dirPath + "/" + file;
            var stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                // console.log('\n读取目录：\n', filePath, "\n");
                readDirectory(filePath);
            } else if (stats.isFile()) {
                var buff = fs.readFileSync(filePath);
                try {
                    if (!buff.isEmpty  && buff[0].toString(16).toLowerCase() == "ef" && buff[1].toString(16).toLowerCase() == "bb" && buff[2].toString(16).toLowerCase() == "bf") {
                        //EF BB BF 239 187 191
                        console.log('mvim -b', filePath, "\n");

                        // buff = buff.slice(3);
                        // console.log(buff);
                        // fs.writeFileSync(filePath, buff);
                    }
                } catch (e)
                {

                }

            }
        });

    } else {
        console.log('Not Found Path : ', dirPath);
    }
}

readDirectory(path);/**
 * Created by hhfa on 4/15/16.
 */
