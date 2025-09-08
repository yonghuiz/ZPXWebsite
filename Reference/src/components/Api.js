import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import './Api.css'

class Api extends Component {
    constructor(props) {
        super(props);
        this.state = {activeTab:"JavaScript"};
       this.openTab = this.openTab.bind(this);
    }

    openTab( tabName) {
        // console.log("openTab",tabName)
        this.setState({activeTab:tabName});
      }


    render() {
        return (
            <div >
                <Header page='Api'/>
                <section>
                    <div className="mycontainer ">
                        <h3 className="title">REST API</h3>
                        <p>You can use the following URL and use HTTP POST or GET method to send your SMS message.</p>
                        <span className="httpMethod">POST</span>
                        <span className="httpMethod">GET</span>
                        <p className="apiUrl">
                            http://sms.ez2goSMS.us/api/Message/postMessage
                        </p>
                        <h4 className="title2">Parameter</h4>
                        <table className="paramTb">
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>appKey</td>
                                    <td>String</td>
                                    <td>get appKey after register</td>
                                </tr>
                                <tr>
                                    <td>appSecret</td>
                                    <td>String</td>
                                    <td>get appSecret after register</td>
                                </tr>
                                <tr>
                                    <td>sendTo</td>
                                    <td>String</td>
                                    <td>10 or 11 digit mobile phone number</td>
                                </tr>
                                <tr>
                                    <td>countryCode</td>
                                    <td>String</td>
                                    <td>mobile number country code,eg +1 0086</td>
                                </tr>
                                <tr>
                                    <td>content</td>
                                    <td>String</td>
                                    <td>SMS content</td>
                                </tr>
                            </tbody>

                        </table>
                        <h4 className="title2">Success Response</h4>
                        <table className="paramTb">
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Type</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ret</td>
                                    <td>Number</td>
                                    <td>'0' => 'success',
                  <br />'1' => 'invalid appKey or appSecret',
                  <br /> '2' => 'empty sendTo',
                  <br /> '3' => 'empty content',
                  <br />'4' => 'wrong phone format with country code',
                  <br /> '5' => 'wrong country code',
                </td>
                                </tr>
                                <tr>
                                    <td>msg</td>
                                    <td>String</td>
                                    <td>description for the ret</td>
                                </tr>
                                <tr>
                                    <td>data</td>
                                    <td>Object</td>
                                    <td>reserved,null</td>
                                </tr>
                            </tbody>

                        </table>
                        <p></p>
                    </div>
                </section>
                <section>
                    <div className="mycontainer">
                        <h3 className="title">Code Demo</h3>
                        <div className="tab">
                            <button className={this.state.activeTab==='JavaScript'?'active':null} onClick={()=>this.openTab('JavaScript')}>HTML/JavaScript</button>
                            <button className={this.state.activeTab==='PHP'?'active':null} onClick={()=>this.openTab('PHP')}>PHP</button>
                            <button className={this.state.activeTab==='Python'?'active':null} onClick={()=>this.openTab('Python')}>Python</button>
                            <button className={this.state.activeTab==='Shell'?'active':null} onClick={()=>this.openTab('Shell')}>Shell</button>
                            <button className={this.state.activeTab==='Java'?'active':null} onClick={()=>this.openTab('Java')}>Java</button>
                            <button className={this.state.activeTab==='C#'?'active':null} onClick={()=>this.openTab('C#')}>C#</button>
                            <button className={this.state.activeTab==='C++'?'active':null} onClick={()=>this.openTab('C++')}>C++</button>
                            <button className={this.state.activeTab==='C'?'active':null} onClick={()=>this.openTab('C')}>C</button>
                        </div>

                        <div id="Javascript" className="tabcontent" style={{display:this.state.activeTab==='JavaScript'?'block':'none'}}>
                            <pre className="prettyprint lang-html linenums democode">
                {`
<!doctype html>
<html lang="en">
<head>
    <title>Send SMS</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" ></script>
    <script>
        function sendSMS(phoneNumber, countryCode, SMSContent) {
            var data = {
                appKey: '[Your appKey]',
                appSecret: '[Your appSecret]',
                sendTo: phoneNumber,
                countryCode: countryCode,
                content: SMSContent
            }

            $.post("http://sms.ez2gosms.us/api/Message/postMessage",
                data,
                function (data, status) {
                    alert("Data: " + data + "\nStatus: " + status);
                });
        }
        function testSMS(){
            sendSMS('5551111234','+1','test SMS content');
        }
    </script>
</head>
<body>
    <div>
        <button id='btn' onclick='testSMS()'>Send SMS</button>
    </div>
</body>
</html>

`}

                            </pre>
                        </div>

                        <div id="Shell" className="tabcontent"  style={{display:this.state.activeTab==='Shell'?'block':'none'}}>
                            <pre className="prettyprint  linenums democode">
    {`
#!/bin/sh
#APIKEY
appKey="[Your appKey]"
#APISecret
appSecret="[Your appSecret]"
#10 or 11 digit mobile number
mobile="5551111234"
#country code
countryCode="+1"
#SMS content
content="test SMS content"
echo "send sms:"
curl --data "appKey=$appKey&appSecret=$appSecret&mobile=$sendTo&countryCode=$countryCode&content=$content&rd=1" "http://sms.ez2gosms.us/api/Message/postMessage" 
`}
                            </pre>
                        </div>

                        <div id="Python" className="tabcontent"  style={{display:this.state.activeTab==='Python'?'block':'none'}}>
                            <pre className="prettyprint  linenums democode">
{`
#!/usr/local/bin/python
  #-*- coding:utf-8 -*-
  import httplib
  import urllib
  
  host  = "sms.ez2gosms.us"
  sms_send_uri = "/api/Message/postMessage"
  
  #appKey
  account  = "[Your appKey]" 
  #appSecret
  password = "[Your appSecret]"
  #countryCode
  countryCode="+1"
  def send_sms(text, mobile):
      params = urllib.urlencode({'appKey': account, 'appSecret' : password,'sendTo':mobile, 'countryCode':countryCode,'content': text, 'format':'json' })
      headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
      conn = httplib.HTTPConnection(host, port=80, timeout=30)
      conn.request("POST", sms_send_uri, params, headers)
      response = conn.getresponse()
      response_str = response.read()
      conn.close()
      return response_str 
  
  if __name__ == '__main__':
  
      mobile = "5551111234"
      text = "test SMS content"
  
      print(send_sms(text, mobile))
`}
                            </pre>
                        </div>

                        <div id="C#" className="tabcontent" style={{display:this.state.activeTab==='C#'?'block':'none'}}>
                            <pre className="prettyprint  linenums democode">
                                {`
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

protected void SendSMSMessage()
   {
      string sendTo = this.txtPhoneNumbers.Text.Trim();
      string code = Convert.ToString(this.cbbCountryCode.SelectedValue);
      string content = System.Web.HttpUtility.UrlEncode(this.txtContent.Text.Trim());
      string strPostData = string.Format("appKey={0}&appSecret={1}&sendTo={2}&countryCode={3}&content={4}", Api_Key, Api_Secret, sendTo, code, content);
      CookieContainer cookie = new CookieContainer();
      HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://sms.ez2gosms.us/api/Message/postMessage");
      request.Method = "POST";
      request.ContentType = "application/x-www-form-urlencoded";
      request.ContentLength = Encoding.UTF8.GetByteCount(strPostData);
      request.CookieContainer = cookie;
      Stream myRequestStream = request.GetRequestStream();
      StreamWriter myStreamWriter = new StreamWriter(myRequestStream, Encoding.GetEncoding("gb2312"));
      myStreamWriter.Write(strPostData);
      myStreamWriter.Close();
      
      HttpWebResponse response = (HttpWebResponse)request.GetResponse();
      
      response.Cookies = cookie.GetCookies(response.ResponseUri);
      Stream myResponseStream = response.GetResponseStream();
      StreamReader myStreamReader = new StreamReader(myResponseStream, Encoding.GetEncoding("utf-8"));
      string retString = myStreamReader.ReadToEnd();
      string ret = Regex.Match(retString, "{\"ret\":([\\s\\S]*?),\"msg\"").Groups[1].Value;
      if(ret =="0")
      {
          MessageBox.Show("success");
      }
      else
      {
          MessageBox.Show("failed send");
      }
      myStreamReader.Close();
      myResponseStream.Close();
   
   }
`}
                            </pre>
                        </div>

                        <div id="Java" className="tabcontent" style={{display:this.state.activeTab==='Java'?'block':'none'}}>
                            <pre className="prettyprint  linenums democode">
                {`
// using Spring Boot
package hello;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class Application {

private static final Logger log = LoggerFactory.getLogger(Application.class);

public static void main(String args[]) {
    SpringApplication.run(Application.class);
}

@Bean
public RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder.build();
}

@Bean
public CommandLineRunner run(RestTemplate restTemplate) throws Exception {
    return args -> {
    String url = "http://sms.ez2gosms.us/api/Message/postMessage";			
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map= new LinkedMultiValueMap<String, String>();
    map.add("appKey", "[Your appKey]");
    map.add("appSecret", "[Your appSecret]");
    map.add("sendTo", "5551111234");//10 or 11 digit mobile number
    map.add("countryCode", "+1");
    map.add("content", "sms from java");

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

    ResponseEntity<String> response = restTemplate.postForEntity( url, request , String.class );
    
    log.info(response.toString());
    };
}
}    
`}
                            </pre>
                        </div>

                        <div id="PHP" className="tabcontent" style={{display:this.state.activeTab==='PHP'?'block':'none'}}>
                            <pre className="prettyprint linenums democode">
{`
<?php
session_start();
header("Content-type:text/html; charset=UTF-8");
//post data to sms gateway
function Post($curlPost,$url){
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_NOBODY, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    $return_str = curl_exec($curl);
    curl_close($curl);
    return $return_str;
}
//SMS API Adress
$target = "http://sms.ez2gosms.us/api/Message/postMessage";
//APIKEY
$account="[your ApiKey]";
//Api Secret
$password="[your Api Secret]";
//mobile phone to send 10 or 11 digits
$mobile ="1234567890";
//country code
$country_code ="+1";
//sms content
$sms_content = "this is SMS content";
$post_data = "appKey=".$account."&appSecret=".$password."&sendTo=".$mobile."&countryCode=".$country_code."&content=".$sms_content;
$result=json_decode(Post($post_data, $target),true);

if($result){
  
    if($result['ret']==0){
    echo $result['msg'];
    }else{
        echo $result['msg'];
    }

}else{
    echo "error";
}
?>
`}
                            </pre>
                        </div>
                        <div id="C++" className="tabcontent" style={{display:this.state.activeTab==='C++'?'block':'none'}} >
                            <pre className="prettyprint lang-cpp linenums democode">
{`
// DEMO
#include <arpa/inet.h>
#include <assert.h>
#include <errno.h>
#include <netinet/in.h>
#include <signal.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <sys/wait.h>
#include <netdb.h>
#include <unistd.h>

#define SA struct sockaddr
#define MAXLINE 4096
#define MAXSUB  2000
#define MAXPARAM 2048
#define LISTENQ 1024

extern int h_errno;

int basefd;
char *hostname = "sms.ez2gosms.us";
char *send_sms_uri = "/api/Message/postMessage&format=json";

/**
* http post
*/
ssize_t http_post(char *page, char *poststr)
{
    char sendline[MAXLINE + 1], recvline[MAXLINE + 1];
    ssize_t n;
    snprintf(sendline, MAXSUB,
        "POST %s HTTP/1.0\r\n"
        "Host: %s\r\n"
        "Content-type: application/x-www-form-urlencoded\r\n"
        "Content-length: %zu\r\n\r\n"
        "%s", page, hostname, strlen(poststr), poststr);

    write(basefd, sendline, strlen(sendline));
    while ((n = read(basefd, recvline, MAXLINE)) > 0) {
        recvline[n] = '\0';
        printf("%s", recvline);
    }
    return n;
}

/**
* send sms
*/
ssize_t send_sms(char *account, char *password, char *mobile,  char *countryCode,char *content)
{
    char params[MAXPARAM + 1];
    char *cp = params;
    sprintf(cp,"appKey=%s&appSecret=%s&sendTo=%s&countryCode&content=%s", account, password, mobile, countryCode,content);
    return http_post(send_sms_uri, cp);
}

int  socked_connect(char *arg)
{
    struct sockaddr_in their_addr = {0};  
    char buf[1024] = {0};  
    char rbuf[1024] = {0};  
    char pass[128] = {0};  
    struct hostent *host = NULL;   
    
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if(sockfd<0)
    {
        printf ("create the sockfd is failed\n");
        return -1;
    }
    
    if((host = gethostbyname(arg))==NULL)  
    {  
        printf("Gethostname error, %s\n");  
        return -1; 
    }  
  
    memset(&their_addr, 0, sizeof(their_addr));  
    their_addr.sin_family = AF_INET;  
    their_addr.sin_port = htons(80);  
    their_addr.sin_addr = *((struct in_addr *)host->h_addr);
    if(connect(sockfd,(struct sockaddr *)&their_addr, sizeof(struct sockaddr)) < 0)  
    {  
        close(sockfd);
        return  -1;
    }  
    printf ("connect is success\n");
    return sockfd;
    
}

int main(void)
{
    struct sockaddr_in servaddr;
    char str[50];
    
    #if 0
    //create esocket connection
    sockfd = socket(AF_INET, SOCK_STREAM, 0);
    bzero(&servaddr, sizeof(servaddr));
    servaddr.sin_addr =*(hostname);
    servaddr.sin_family = AF_INET;
    servaddr.sin_port = htons(80);
    inet_pton(AF_INET, str, &servaddr.sin_addr);
    connect(sockfd, (SA *) & servaddr, sizeof(servaddr));
    #endif
    
    if((basefd= socked_connect(hostname))==-1)
    {
        printf("connect is failed\n");
        return -1;
    }
    printf("basefd is =%d\n",basefd);
    //APIID
    char *account = "[your ApiKey]";

    //APIKEY
    char *password = "[your ApiSecret]";

    //mobile number
    char *mobile = "[mobile number]";

  //country code
    char *countryCode = "[001]";
  
    //sms content
    char *message = "[sms content]";

    /**************** send sms *****************/
    send_sms(account, password, mobile, countryCode, message);
    printf("send the message is success\n");
    close(basefd);
    exit(0);
}
`}
                            </pre>
                        </div>
                        <div id="C" className="tabcontent" style={{display:this.state.activeTab==='C'?'block':'none'}} >
                            <pre className="prettyprint lang-cpp linenums democode">
{`
#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <time.h>
#include <errno.h>
#include <signal.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>
#include <sys/time.h>
#include <netinet/in.h>
#include <arpa/inet.h>
  
#define IPSTR "sms.ez2gosms.us"
#define PORT 80
#define BUFSIZE 1024

  
//compile gcc -o sms sms.c

int main(int argc, char **argv)
{
        int sockfd, ret, i, h,srandnum;
        struct sockaddr_in servaddr;
        char str1[4096], str2[4096], buf[BUFSIZE], *str;
        socklen_t len;
        fd_set   t_set1;
        struct timeval  tv;
  
        if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0 ) {
                printf("connect fail,socket error!\n");
                exit(0);
        };
  
        bzero(&servaddr, sizeof(servaddr));
        servaddr.sin_family = AF_INET;
        servaddr.sin_port = htons(PORT);
        if (inet_pton(AF_INET, IPSTR, &servaddr.sin_addr) <= 0 ){
                printf("connect fail,inet_pton error!\n");
                exit(0);
        };
  
        if (connect(sockfd, (struct sockaddr *)&servaddr, sizeof(servaddr)) < 0){
                printf("connect error!\n");
                exit(0);
        }
        printf("connect success\n");
        //parameter

        //send data
        memset(str2, 0, 4096);
        //replace the content in '[]'
        strcat(str2, "appKey=[your appKey]&appSecret=[your appSecret]&sendTo=[mobile number]&countryCode=[country code]&content=[sms content]");
        str=(char *)malloc(128);
        len = strlen(str2);
        sprintf(str, "%d", len);
  
        memset(str1, 0, 4096);
        strcat(str1, "POST /api/Message/postMessage&format=json HTTP/1.1\n");
        strcat(str1, "Host: sms.ez2gosms.us\n");
        strcat(str1, "Content-Type: application/x-www-form-urlencoded\n");
        strcat(str1, "Content-Length: ");
        strcat(str1, str);
        strcat(str1, "\n\n");
  
        strcat(str1, str2);
        strcat(str1, "\r\n\r\n");
        printf("%s\n",str1);
  
        ret = write(sockfd,str1,strlen(str1));
        if (ret < 0) {
                printf("send error! error code: %d，error info:'%s'\n",errno, strerror(errno));
                exit(0);
        }else{
                printf("send success,sent %d bytes！\n\n", ret);
        }
  
        FD_ZERO(&t_set1);
        FD_SET(sockfd, &t_set1);
  
        while(1){
                sleep(2);
                tv.tv_sec= 0;
                tv.tv_usec= 0;
                h = 0;
                printf("--------------->1\r\n");
                h = select(sockfd +1, &t_set1, NULL, NULL, &tv);
                printf("--------------->2%d\r\n",h);
  
                if (h == 0) {
                        close(sockfd);
                        printf("connect closed\n");
                        return 1;
                };

                if (h < 0) {
                        close(sockfd);
                        printf("socket error\n");
                        return -1;
                };
  
                if (h > 0){
                        memset(buf, 0, 4096);
                        i= read(sockfd, buf, 4095);
                        if (i==0){
                                close(sockfd);
                                printf("closed by reomte end,exit\n");
                                return -1;
                        }
  
                        printf("%s\n", buf);
                }
        }
        close(sockfd);
  
        return 0;
}                  
`}
                            </pre>
                        </div>
                        <br/>
                       
                    </div>
                </section>
                <Footer />
                
            </div>
        );
    }
}

export default Api;