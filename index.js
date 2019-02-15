var CDynamicDomain = require( './CDynamicDomain.js' );
new CDynamicDomain( '', '',
	'weloong.top', 'computer', 'A', ( funcCallback )=>{
		CDynamicDomain.GetWorldIP( funcCallback );
	}, 5000 );
