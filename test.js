var fs = require("fs");
var xxtea = require("./lib/xxtea.js");

function test1(e) {
    var key = Buffer.from("xteaKeyValue0123456789ABCDEF");
    if (e) { //encrypt
        var path_plain = "./plain.bin";
        var bytes = fs.readFileSync(path_plain);
        console.log("original bytes:" + bytes.length + " key:" + key.length);
        try {
            bytes = xxtea.encrypt(bytes, key);
            var path_e = "./e.out";
            fs.writeFileSync(path_e, bytes);
        } catch (e) {
            console.log("15", e);
        }
    } else { //decrypt
        var path_e = "./plain.bin.e"; //generated by other implementation
        var bytes = fs.readFileSync(path_e);
        console.log("original bytes:" + bytes.length + " key:" + key.length);
        try {
            bytes = xxtea.decrypt(bytes, key);
            var path_plain = "./p.out";
            fs.writeFileSync(path_plain, bytes);
        } catch (e) {
            console.log("26", e);
        }
    }
}

function test2() {
    var good = true;
    var key = Buffer.from("xteaKey"); //  Value0123456789ABCDEF
    //encrypt
    var path_plain = "./plain.bin";
    var bytes = fs.readFileSync(path_plain);
    console.log("original bytes:" + bytes.length + " key:" + key.length);
    try {
        bytes = xxtea.encrypt(bytes, key);
        var path_e = "./e.out";
        fs.writeFileSync(path_e, bytes);
    } catch (e) {
        console.log("43", e);
        good = false;
    }
    //decrypt
    var path_e = "./e.out"; // "./plain.bin.e";
    var bytes = fs.readFileSync(path_e);
    console.log("original bytes:" + bytes.length + " key:" + key.length);
    try {
        bytes = xxtea.decrypt(bytes, key);
        var path_plain = "./p.out";
        fs.writeFileSync(path_plain, bytes);
    } catch (e) {
        console.log("55", e);
        good = false;
    }
    if (good)
        console.log("now you can compare the original file and the final file: plain.bin and p.out. they should be same.\nAnd you can compare the encrypted file e.out with the encrypted result by any other implementation.");
}

function test3() {
    var key = Buffer.from("xteaKey"); //  Value0123456789ABCDEF
    //encrypt
    var bytes = "a string as plain data to be encrypted";
    console.log("original bytes:" + bytes.length + " key:" + key.length);
    try {
        bytes = xxtea.encrypt(bytes, key);
        var path_e = "./e.out";
        fs.writeFileSync(path_e, bytes);
    } catch (e) {
        console.log("72", e);
    }
    //decrypt
    var bytes = "a string as encrypted data to be decrypted";
    console.log("original bytes:" + bytes.length + " key:" + key.length);
    try {
        bytes = xxtea.decrypt(bytes, key);
        var path_plain = "./p.out";
        fs.writeFileSync(path_plain, bytes);
    } catch (e) {
        console.log("82", e);
    }
}


//test1(true);
//test1(false);
test2();
test3();