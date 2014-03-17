/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    database: null,
    ctrl: null,
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // configure jquery mobile
    //
    onQueryMobileConfigure: function() {
        $.mobile.pushStateEnabled = false;
        $.support.cors = true;
        console.log('onQueryMobileConfigure');
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.onQueryMobileConfigure();
        app.testPouchAllDocs();
        app.ctrl = controller;
        app.ctrl.init();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */
        console.log('Received Event: ' + id);
    },

    testPouchAllDocs: function() {
      console.log('Running testPouchAllDocs')
      var date = new Date()
      app.database = PouchDB('test') //+ date.getTime())
      app.database.post({title: '1'}, function(err, res) {
        console.log('Pouch post 1:')
        console.log(JSON.stringify(res))
        console.log(err)
        app.database.get(res.id, function(err, res) {
          console.log('Pouch get 1:')
          console.log(JSON.stringify(res))
          console.log(err)
          app.database.post({title: '2'}, function(err, res) {
            console.log('Pouch post 2:')
            console.log(JSON.stringify(res))
            console.log(err)
            app.database.get(res.id, function(err, res) {
              console.log('Pouch get 2:')
              console.log(JSON.stringify(res))
              console.log(err)
              app.database.allDocs({include_docs: true}, function(err, response) {
                console.log('Pouch allDocs:')
                console.log(JSON.stringify(response))
                console.log(err)
              });
            })
          })
        })
      })
    }
};
