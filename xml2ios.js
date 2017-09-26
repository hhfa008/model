/**
 * Created by hhfa on 4/6/16.
 */
var xml = require('./xml.js');

// Include i18n-strings-files
var i18nStringsFiles = require('i18n-strings-files');
var project = "/Users/hhfa/work/uniclubber/uniclubber/";
var allType = ["zh-Hans.lproj","en.lproj","zh-Hant.lproj"];



var base  = "/Localizable.strings";
var mainsrc  = "/Main.strings";


var xmlp = ["/Users/hhfa/Documents/club/ios1/res/values-zh-rCN/strings.xml",
    "/Users/hhfa/Documents/club/ios1/res/values-en-rUS/strings.xml",
    "/Users/hhfa/Documents/club/ios1/res/values-zh-rHK/strings.xml"]
// values-en-rUS
// values-zh-rCN
// values-zh-rHK
// values-zh-rTW

var baseXib = []
var mainXib = []
for(var type in allType)
{
    var path = project + allType[type] + base
    var path1 = xmlp[type]
    var data = i18nStringsFiles.readFileSync(path, { 'encoding' : 'UTF-16', 'wantsComments' : false });
    //console.log(data);
    //console.log(data1);
    xml.readFile(path1,{ 'encoding' : 'UTF-8', 'wantsComments' : false },function (ios) {
        // console.log(ios)
        mainXib[type] = ios
    })
    baseXib.push(data)
}


translate()



function translate()
{





    function trim(str){
        return str;
        return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, '');
    }

    function match(data, name)
    {
        //console.log("name::::::::" + name)
        for(var index in data)
        {
            var item = data[index]
            //console.log("item::::::::" + item)
            if (trim(item) == trim(name)) return index


            var patt = new RegExp(/name/);
            var patt1 = new RegExp(/item/);
            if(patt.test(item) || patt1.test(name))return index
        }
        return null;
    }

    function addCN(key,index)
    {
        var result = mainXib[0][key];

        baseXib[0][key] = result

        //var item = mainXib[1][index];
        //item.text = result;
        //mainXib[1][index] = item;
    }

    function addEN(key,index)
    {
        var result = mainXib[1][key];

        baseXib[1][key] = result

        //var item = mainXib[1][index];
        //item.text = result;
        //mainXib[1][index] = item;
    }

    function addT(key,index)
    {
        var result = mainXib[2][key];

        baseXib[2][key] = result

        //var item = mainXib[1][index];
        //item.text = result;
        //mainXib[1][index] = item;
    }

    function transEN(key)
    {
        // var result = baseXib[1][key];
        baseXib[1][key] = mainXib[1][key];
        // item.text = result;
        // mainXib[1][index] = item;
    }

    function transT(key)
    {
        baseXib[2][key] = mainXib[2][key];
    }





    //console.log(path1);
    var base1 = baseXib[0]
    var mainItem = mainXib[0]

    for(var index in mainItem)
    {
        var item = mainItem[index]
        var text =  item
        var key = match(base1, text)
        console.log(key);
        if(key)
        {
            // transEN(key)
            // transT(key)
        } else
        {
            addCN(index,item)
            addEN(index,item)
            addT(index,item)
        }


    }



    for(var type in allType) {
        var base1 = baseXib[type]

        for (var index in base1) {

            if (/title_activity_/.test(index)) {
                delete base1[index]
            }

        }
    }


    //console.log(data);
    console.log( mainXib[1]);
    //baseXib.push(data)
    //mainXib.push(data1)





    for(var type in allType)
    {
        var path = project + allType[type] + base
        var path1 = project  + "/local.strings";

        console.log(path1);
        var data = i18nStringsFiles.writeFileSync(path, baseXib[type],{ 'encoding' : 'UTF-16', 'wantsComments' : false });
        // var data1 = i18nStringsFiles.writeFileSync(path1,mainXib[type], { 'encoding' : 'UTF-8', 'wantsComments' : true });
        console.log(data);
        // console.log(data1);
        //baseXib.push(data)
        //mainXib.push(data1)
    }
}




//i18nStringsFiles.writeFileSync('Localizable.strings', data, { 'encoding' : 'UTF-16', 'wantsComments' : true });
//console.log('File written');
//
////console.log(baseXib);
//
//console.log(mainXib);
//Base.lproj/Localizable.strings
///Users/hhfa/work/uniclubber/uniclubber/Base.lproj/Localizable.strings
///Users/hhfa/work/uniclubber/uniclubber/Base.lproj/Localizable.strings
///Users/hhfa/work/uniclubber/uniclubber/en.lproj/Main.strings
///Users/hhfa/work/uniclubber/uniclubber/zh-Hans.lproj/Localizable.strings
///Users/hhfa/work/uniclubber/uniclubber/zh-Hant.lproj/Main.strings
// Read 'Localizable.strings' and return it as an object containing the key/value (each value contains 'text' and 'comment') pairs
//var data = i18nStringsFiles.readFileSync('/Users/hhfa/work/uniclubber/uniclubber/file_name.strings', { 'encoding' : 'UTF-16', 'wantsComments' : true });
//console.log(data);