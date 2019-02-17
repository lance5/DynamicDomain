var CDynamicDomain = require( './CDynamicDomain.js' );
var arguments = process.argv;

function GetCMDParam( argv, szName, szDefault )
{
    var value = szDefault;
    for( var i = 0; i < argv.length - 1; ++i )
    {
        if( argv[i] != szName )
            continue;
        value = argv[i+1];
    }
    if( !value )
        throw szName + ' not found！！！';
    return value;
}

for( var i = 0; i < arguments.length; ++i )
    if( arguments[i] == '-help' )
        return console.log( `参数如下：
-id 阿里云access key
-secret 阿里云access secret
-domain  域名
-rr  主机记录
-type  记录类型 默认A
-interval 网络调用频率  默认5000` );

var szAccessKeyID = GetCMDParam( arguments, '-id' );
var szAccessKeySecret = GetCMDParam( arguments, '-secret' );
var szDomain = GetCMDParam( arguments, '-domain' );
var szRR = GetCMDParam( arguments, '-rr' );
var szType = GetCMDParam( arguments, '-type', 'A' );
var nInterval = GetCMDParam( arguments, '-interval', 5000 );
new CDynamicDomain( szAccessKeyID, szAccessKeySecret,
    szDomain, szRR, szType, nInterval );