var express = require('express');
var JSONData = require('./heros.json');
var fs = require("fs");
//const mysql = require('mysql2');
const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
 
const contact = new Schema({
  id: ObjectId,
  name: String,
  phoneNo: String,
  location: String
 
});

const myModel = mongoose.model('contact',contact);
let Heros= {}
Heros.getAll = function(){
    return new Promise(function (resolve,reject){
    const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
    console.log(connection);
    myModel.find({},function(err,contact){
    	if (err){
    		console.log(err);
    		console.log('ERR :: fetching data from database');
            reject();
    	}
    		else{
    			//console.log(result);
    			console.log(contact);
                resolve(contact);
    		
    	    }
        });


    });
}

Heros.saveNew= function(newHeroData){
    return new Promise(function (resolve,reject){
    const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
    console.log(connection);

    var newUser = myModel({
                name:`${newHeroData.name}`,
                phoneNo:`${newHeroData.phoneNo}`,
                location : `${newHeroData.location}`

            });

    newUser.save({},function(err,contact){
        if (err){
            console.log(err);
            console.log('ERR :: fetching data from database');
            reject();
        }
            else{
                //console.log(result);
                console.log(contact);
                resolve(contact);
            
            }
        });


    });
}
Heros.deleteRow = function(newContact){
    return new Promise(function (resolve, reject){


        // //Set up default mongoose connection
        const connection = mongoose.connect('mongodb://127.0.0.1:27017/myDB');
        console.log(connection);

        // call the built-in save method to save to the database
        console.log(`${newContact.name}`);
        myModel.findOneAndRemove({name :`${newContact.name}`}, function(err){
            if (err) {
                console.log(err);
                console.log('ERR :: fetching data from database..');
                reject();
            }
            else {
                //console.log(result);
                console.log(contact);

                resolve(contact);
            }

        });
    });
}

/*
Heros.saveNew = function(newHeroData){ 
    return new Promise(function (resolve,reject){
    const connection = mongoose.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'ExpressExample',
      password: 'ccs#1234'
});
    let query = `insert into comic(superhero,publisher,alter_ego,first_appearance,characters,is_valid,update_time) values('${newHeroData.superHero}','${newHeroData.publisher}','${newHeroData.alterEgo}','${newHeroData.firstAppearance}','${newHeroData.characters}', '1','${new Date()}')`;
    connection.query(query,function(err,result,fields){
        if (err){
            console.log(err);
            console.log('ERR :: fetching data from database');
            reject();
        }
            else{
                //console.log(result);
                //console.log(fields);
                resolve(result);
            
            }
        });


    });
    
}
Heros.deleteRow = function(newHeroData){ 
    return new Promise(function (resolve,reject){
    const connection = mongoose.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'ExpressExample',
      password: 'ccs#1234'
});
    console.log(newHeroData);
    let query = `update comic set is_valid = 0 where id = '${newHeroData.id}'`;
    connection.query(query,function(err,result,fields){
        if (err){
            console.log(err);
            console.log('ERR :: fetching data from database');
            reject();
        }
            else{
                //console.log(result);
                //console.log(fields);
                resolve(result);
            
            }
        });


    });
    
}

Heros.viewRow = function(newHeroData){ 
    return new Promise(function (resolve,reject){
    const connection = mongoose.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'ExpressExample',
      password: 'ccs#1234'
});
    console.log(newHeroData);
    let query = `select * from comic where id = '${newHeroData.id}'`;
    console.log(query);
    connection.query(query,function(err,result,fields){
        if (err){
            console.log(err);
            console.log('ERR :: fetching data from database');
            reject();
        }
        else{
                //console.log(result);
                //console.log(fields);
                resolve(result);
            
           }
        });


    });
    
}
*/
module.exports = Heros;