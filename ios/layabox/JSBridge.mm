#import "JSBridge.h"
#import "AppDelegate.h"
#import <conchRuntime.h>
#import "ModuleWithEmitter.h"
@implementation JSBridge

+(void)hideSplash
{
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
        [appDelegate.launchView hide];
    });
}
+(void)setTips:(NSArray*)tips
{
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
        appDelegate.launchView.tips = tips;
    });
}
+(void)setFontColor:(NSString*)color
{
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
        [appDelegate.launchView setFontColor:color];
    });
}
+(void)bgColor:(NSString*)color
{
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
        [appDelegate.launchView setBackgroundColor:color];
    });
}
+(void)loading:(NSNumber*)percent
{
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
        [appDelegate.launchView setPercent:percent.integerValue];
    });
}
+(void)showTextInfo:(NSNumber*)show
{
    dispatch_async(dispatch_get_main_queue(), ^{
        AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
        [appDelegate.launchView showTextInfo:show.intValue > 0];
    });
}


+(void)postMessage:(NSString*)message{
  
    NSData*jsonData = [message dataUsingEncoding:NSUTF8StringEncoding];
    NSError*err;
    NSDictionary* dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
   if(err) {
     [JSBridge postToGame:[NSString stringWithFormat:@"json解析失败：%@",err]];
    }
   NSString* action = [dic valueForKey:@"action"];

   dispatch_async(dispatch_get_main_queue(), ^{
  
     ModuleWithEmitter* emit=  [ModuleWithEmitter init];
     [emit sendEvent:message];
     if([action isEqual:@"nativeStart"]){
        //  [JSBridge postToGame:[NSString stringWithFormat:@"nativeInitData(%@)",message]];
     }
      
    });
  
}


+(void)postToGame:(NSString*)message{
 
  NSString* postAction =  [NSString stringWithFormat:@"nativeMessage(%@)",message];
  dispatch_async(dispatch_get_main_queue(), ^{
             [[conchRuntime GetIOSConchRuntime] runJS:postAction];
             // [[conchRuntime GetIOSConchRuntime] callbackToJSWithObject:self methodName:@"testAsyncCallback:" ret:retStr];
  });
}


+(void)loadGameUrl:(NSString*)data
{
   NSString* str=@"appCallBack('https://download.jwyxw.net/ios/gameUat/index.js')";
   [JSBridge postToGame:str];
}
@end

