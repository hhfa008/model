/**
 * Created by hhfa on 2/21/16.
 */

String.prototype.trim=function(){
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.toTitleCase = function() {
    var array =this.split("_")
    var s = "";
    array.forEach(function (t) {
        var v  = t.charAt(0).toUpperCase() + t.substr(1)
        if(v)
        {
            s+=v
        }


    })
   return s
};
function log(d)
{
    console.log(d);
}

var fs = require('fs');
var URL = require('url');


var src2replace = "http://www.jzhihui.com/mz/index.php"

var target_path = require('os').homedir() + "/git/ios2.code/Weuse/WeFun/Model/"

function ReplaceFirstUper(str)
{
    //str = str.toLowerCase();
    str = str.replace(/\b(\w)|\s(\w)|_(\w)/g, function(m){
        return m.toUpperCase();
    });
   return str.replace(/_/g,"");
}
fs.readFile('./src.json',"utf8",function(err,data) {
    src = data

    if(src.match(/http/)){


    } else
    {
        src = "http://" + src;
    }

    // var nodegrass = require('nodegrass');
    // nodegrass.post(src,function(data,status,headers){
    //     console.log(status);
    //     console.log(headers);
    //     console.log(data);
    // },null,null,'utf8').on('error', function(e) {
    //     console.log("Got error: " + e.message);
    // });
    fs.readFile('./req.json',"utf8",function(err,reqdata) {
        req = reqdata
        // createQuery(req)
        createModel()
    });
});

function json2OC(b, jsonObj) {

    var  a = "";
    if (!(typeof (b) == 'string'))
        for (var o in b) {

            if (typeof (b[o]) == 'string')
                a = a + "\n" + ("@property (nonatomic, copy) NSString* " + (o == "id" ? "_id" : o) + ";//" + b[o])

            if (b[o] instanceof Array) {
                a = a + "\n" + ("@property (nonatomic) NSArray* " + o + ";//" + b[o])
            } else if (typeof (b[o]) == 'object')
                a = a + "\n" + ("@property id " + o + ";//" + b[o])

            if (typeof (b[o]) == 'number')
                a = a + "\n" + ("@property (nonatomic) NSNumber* " + o + ";//" + b[o])

            if (typeof (b[o]) == 'boolean')
                a = a + "\n" + ("@property (nonatomic) NSNumber* " + o + ";//" + b[o])
        }
    a = a + "\n" + "@end"

    a = a + "\n/*\n" + JSON.stringify(jsonObj, null, 2) + "\n*/";

    console.log(a)
    return a;
}

function createQuery(data){
    try {  var jsonObj = JSON.parse(data);}
    catch (e){
        log(e)
        console.trace(e)
        return
    }



    if (typeof (jsonObj) == 'object')
    {

        if(jsonObj )

        var json =jsonObj
        var length = 0;
        //console.log(jsonObj)

        var b = jsonObj

        var a = json2OC(b, jsonObj);

        var path = target_path;


        var name= "" ;
        var prefix = "WP";

        var arr = src.split("/")
        var lastpath = ReplaceFirstUper(arr.pop()).trim()
        var cls =  name.length > 1 ?prefix+ "Form":lastpath + "Form";

        var dcls = "ClubInfoModel"


        src =  src.replace(src,"")

        fs.readFile('./ClubInfoModel.h',"utf8",function(err,data) {
            log(data)

            data = data.replace(/ClubInfoModel/g, cls);
            var content = data + a ;


            fs.writeFile(path + cls+".h",content,function(err){
                if(err) throw err;
                console.log('has finished');
            });

        })

        fs.readFile('./ClubInfoModel.m',"utf8",function(err,data) {
            log(data)

            data = data.replace(/ClubInfoModel/g, cls);

            console.log(data);
            data = data.replace("appsrc", src.trim());

            console.log(data);
            //var content = data + a ;

            fs.writeFile(path + cls+".m",data,"utf8",function(err){
                if(err) throw err;


                console.log(lastpath)
                console.log(req)
            });

        })


    }
}

function saveModel(cls, content, lastpath) {
    fs.readFile('./ClubInfoModel.h', "utf8", function (err, data) {
        log(data)

        data = data.replace(/ClubInfoModel/g, cls);
         content = data + content;


        fs.writeFile(target_path + cls + ".h", content, function (err) {
            if (err) throw err;
            console.log('has finished');
        });

    })

    fs.readFile('./ClubInfoModel.m', "utf8", function (err, data) {
        log(data)

        data = data.replace(/ClubInfoModel/g, cls);

        console.log(data);


        var url    = require('url').parse(src);
       var reqsrc = url.path;
        data = data.replace("appsrc", reqsrc);
        // data = data.replace(" ", src);

        console.log(data);
        //var content = data + a ;

        fs.writeFile(target_path + cls + ".m", data, function (err) {
            if (err) throw err;


            var arr = src.split("/")
            console.log(lastpath)
            console.log(req)
        });

    })
}
function createItems(data,lastpath) {


    createSubItem(data,lastpath);
}



function createSubItem(data,lastpath) {
    if (!(typeof (data) == 'string'))
        for (var key in data) {


            var subdata = data[key];
            if ( typeof (subdata) == 'string')
            {

            }

            else if (subdata instanceof Array) {
                createItem(key, subdata[0]);

            } else if (typeof (subdata) == 'object')
            {
                createItem(key, subdata);
            }


        }

}
function createItem(key,data,lastpath) {
    if (key) {
        var content = data
        try
        {
            // b = JSON.parse(b);
            content = json2OC(data, data);
            saveModel(key.toTitleCase() + "Model", content, lastpath);
        } catch (e)
        {

        }
    }

}

function createModel(){
fs.readFile('./data.json', "utf8",function(err,data){
    if(err) throw err;

    var jsonObj = JSON.parse(data);

    var json =jsonObj

    var content = json.result
    var b = content instanceof Array ? content[0]:content?content:json;
    var result = ""
    try
    {
        // b = JSON.parse(b);
         result = json2OC(b, jsonObj);
         result = "//" + req + result ;
    } catch (e)
    {

    }

    if( content  instanceof Array)console.log("array\n\n")

    //b = b.discu[0]





    var name= "" ;

    var arr = src.split("/")
    var lastpath = ReplaceFirstUper(arr.pop()).trim()
    lastpath = lastpath.replace(".Do","")


    var dcls = "ClubInfoModel"


   // src =  src.replace(src2replace,"")
    const querystring = require('querystring');
   var q = querystring.parse(src)


    lastpath = q.a;
    var cls =  name.length > 1 ?cls+ "Model":lastpath + "Model";
    cls = cls.toTitleCase();
    saveModel(cls.toTitleCase(), result, lastpath);
    createItems(content,lastpath);


});
}



