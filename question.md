--1、服务端token请求
2、权限问题
--3、getter
4、resetAction 有什么作用
5、上传
6、header 不同Context-Type
--7、...mapState('common', ["login", "imgCode"])
*******不需要请求的commit怎么处理

***********Content-Type 处理
Content-Type: 如果为默认值application/x-www-form-urlencoded 如果参数是对象，则需要JSON.stringify先处理下， 然后用qs.stringify
              如果是application/json,则要用JSON.stringify处理
