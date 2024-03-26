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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
let token;
// Check if jQuery is loaded
if (typeof jQuery == 'undefined') {
    console.log("jQuery is not loaded. Please make sure to load jQuery before this script.");
} else {
    $(document).ready(function () {
        document.addEventListener('deviceready', onDeviceReady, false);

        function onDeviceReady() {
            document.getElementById("button1").addEventListener("click", signIn);
            console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
            document.getElementById("button2").addEventListener("click", retrieveBankInfo);
            document.getElementById("button3").addEventListener("click", fetchAccountsAtABanks);
            document.getElementById('button4').addEventListener("click", fetchTransactions(1995));
            document.getElementById('deviceready').classList.add('ready');

        }

        function signIn() {
            console.log("in function signIn");
            document.getElementById("text1").innerHTML = "Signing in";

            $.ajax({
                url: "https://apisandbox.openbankproject.com/my/logins/direct",
                type: "POST",
                dataType: "json",
                crossDomain: true,
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", 'DirectLogin username="susan.uk.29@example.com", password="2b78e8", consumer_key="oa5ppybnxquwbdhccdlxcikasrhteyyg2rcdx2nw"');
                },
                success: function (data, textStatus, jQxhr) {
                    console.log("in sign-in success");
                    document.getElementById("text1").innerHTML = "Successful login. Token: " + data.token;
                    token = data.token;
                    retrieveBankInfo();
                },
                error: function (jqXhr, textStatus, errorThrown) {
                    console.log("in sign-in error");
                    console.log("HTTP status code: " + jqXhr.status);
                    console.log("Error thrown: " + errorThrown);
                    console.log("Server response: " + jqXhr.responseText);
                    document.getElementById("text1").innerHTML = "error";
                }
            });
        }
    });
}

function retrieveBankInfo() {
    $.ajax({
        url: "https://apisandbox.openbankproject.com/obp/v4.0.0/banks/gh.29.uk",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
        },
        success: function (data) {
            console.log("in retrieve bank info success");
            console.log(data);
            document.getElementById("text2").innerHTML = "Retrieve Bank Information  successful";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log("in retrieve bank info error");
            document.getElementById("text2").innerHTML = "Retrieve Bank Information failed";
            console.log("HTTP status code: " + jqXhr.status);
            console.log("Error thrown: " + errorThrown);
            console.log("Server response: " + jqXhr.responseText);
        }
    });
}

function fetchAccountsAtABanks() {
    $.ajax({
        url: "https://apisandbox.openbankproject.com/obp/v4.0.0/banks/gh.29.uk/accounts/private",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
        },
        success: function (data) {
            console.log("in fetch accounts at a banks success");
            console.log(data);
            document.getElementById("text3").innerHTML = "Fetch Accounts Held By A User At A Banks successful";
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log("in fetch accounts at a banks error");
            document.getElementById("text3").innerHTML = "Fetch Accounts Held By A User At A Banks successful failed";
            console.log("HTTP status code: " + jqXhr.status);
            console.log("Error thrown: " + errorThrown);
            console.log("Server response: " + jqXhr.responseText);
        }
    });
}

function fetchTransactions(accountId) {
    setTimeout(() => {
        $.ajax({
            url: `https://apisandbox.openbankproject.com/obp/v4.0.0/my/banks/gh.29.uk/accounts/${accountId}/transactions`,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
            },
            success: function (data) {
                console.log("in get user bank transactions success");
                console.log(data);
                document.getElementById("text4").innerHTML = "Fetch User Bank Transactions successful";
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log("in get user bank transaction error");
                document.getElementById("text4").innerHTML = "Fetch User Bank Transactions failed";
                console.log("HTTP status code: " + jqXhr.status);
                console.log("Error thrown: " + errorThrown);
                console.log("Server response: " + jqXhr.responseText);
            }
        });
    }, 2000);
}
