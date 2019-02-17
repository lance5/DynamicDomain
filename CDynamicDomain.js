'use strict';

const Core = require('@alicloud/pop-core');
const https = require('https');

const requestOption = {
    method: 'POST'
};

class CDynamicDomain
{
    constructor( szAccessKeyID, szAccessKeySecret,
        szDomain, szRR, szType, nInterval, funcGetValue )
    {
        this.m_funcGetValue = funcGetValue || function( funcCallback )
        {
            CDynamicDomain.GetWorldIP( funcCallback );
        };
        this.m_nInterval = nInterval;
        this.m_szDomain = szDomain;
        this.m_szType = szType;
        this.m_szRR = szRR;
        
        this.m_pClient = new Core({
            accessKeyId: szAccessKeyID,
            accessKeySecret: szAccessKeySecret,
            endpoint: 'https://alidns.aliyuncs.com',
            apiVersion: '2015-01-09'
        });
        this.m_aryDomainRecords = null;
        this.m_nRecordID = 0;
        this.m_szPrevValue = null;
        this.m_szNextValue = null;

        this.DelayCheck();
    }
    
    static MessageError( ex )
    {
        console.error( "error....................." );
        console.error( ex );
        console.error( "error....................." );
    }
    
    static GetWorldIP( funcCallback )
    {
        https.get( 'https://www.taobao.com/help/getip.php', ( res ) => {
            res.on( 'data', ( d ) => {
                var data = '';
                for( var i = 0; i < d.length; ++i )
                    data += String.fromCharCode( d[i] );
                function ipCallback( pObject )
                {
                    return pObject.ip;
                }
                var szIP = eval( data );
                funcCallback.call( null, szIP );
            } );
        } ).on( 'error', (e) => {
            funcCallback.call( null, null );
        } );
    }

    Check()
    {
        console.log( 'Check', this.m_nRecordID, this.m_szPrevValue, this.m_szNextValue );

        if( this.m_szNextValue === null )
        {
            this.m_funcGetValue.call( this, ( szValue )=>{
                this.m_szNextValue = szValue;
                this.DelayCheck();
            } );
        }
        else if( this.m_aryDomainRecords === null )
        {
            var params = 
            {
                "DomainName": this.m_szDomain
            };
            this.m_pClient.request( 'DescribeDomainRecords', params, requestOption ).then( (result) => {
                var aryRecord = result.DomainRecords.Record;
                this.m_aryDomainRecords = aryRecord;
                for( var i = 0; i < aryRecord.length; ++i )
                {
                    var szRR = aryRecord[i].RR;
                    var szType = aryRecord[i].Type;
                    if( szRR != this.m_szRR || szType != this.m_szType )
                        continue;
                    this.m_nRecordID = aryRecord[i].RecordId;
                    this.m_szPrevValue = aryRecord[i].Value;
                    break;
                }
                this.DelayCheck();
            }, CDynamicDomain.MessageError );
        }
        else if( this.m_nRecordID == 0 )
        {
            var params = {
                "DomainName" : this.m_szDomain,
                "RR": this.m_szRR,
                "Type": this.m_szType,
                "Value": this.m_szNextValue
            };
            this.m_pClient.request( 'AddDomainRecord', params, requestOption ).then( (result) => {
                this.m_nRecordID = result.RecordId;
                this.m_szPrevValue = this.m_szNextValue;
                this.DelayCheck();
            }, CDynamicDomain.MessageError );
        }
        else if( this.m_szPrevValue == this.m_szNextValue )
        {
            this.m_szNextValue = null;
            this.DelayCheck();
        }
        else
        {
            var params = {
                "RecordId" : this.m_nRecordID,
                "RR": this.m_szRR,
                "Type": this.m_szType,
                "Value": this.m_szNextValue
            };
            this.m_pClient.request( 'UpdateDomainRecord', params, requestOption ).then( (result) => {
                this.m_szPrevValue = this.m_szNextValue;
                this.m_szNextValue = null;
                this.DelayCheck();
            }, CDynamicDomain.MessageError );
        }
    }

    DelayCheck()
    {
        setTimeout( ()=>{
            this.Check();
        }, this.m_nInterval );
    }
};

module.exports = CDynamicDomain;
