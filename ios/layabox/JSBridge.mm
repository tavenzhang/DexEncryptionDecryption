#import "JSBridge.h"
#import "AppDelegate.h"
#import <conchRuntime.h>
#import "ModuleWithEmitter.h"
#import "JXHelper.h"
@implementation JSBridge
static ModuleWithEmitter* emit=nil ;
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
//   if(err) {
//     [JSBridge postToGame:[NSString stringWithFormat:@"json解析失败：%@",err]];
//    }
   NSString* action = [dic valueForKey:@"action"];
  AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
  [appDelegate.myEmitter sendEvent:message];
   //ModuleWithEmitter* emit=  [ModuleWithEmitter  new];
  // [emit sendEvent:message];
   dispatch_async(dispatch_get_main_queue(), ^{
     if([action isEqual:@"nativeStart"]){
        [[conchRuntime GetIOSConchRuntime] runJS:[NSString stringWithFormat:@"nativeInitData(%@)",[JXHelper getAppData]]];
     }
    });
  
}


+(void)postToGame:(NSString*)message{
  NSString* postAction =  [NSString stringWithFormat:@"nativeMessage(%@)",message];
  NSData*jsonData = [message dataUsingEncoding:NSUTF8StringEncoding];
  NSError*err;
  NSDictionary* dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
  NSString* action = [dic valueForKey:@"action"];
  dispatch_async(dispatch_get_main_queue(), ^{
    if([action isEqual:@"runJS"]){
        NSString* jsData = [dic valueForKey:@"data"];
         [[conchRuntime GetIOSConchRuntime] runJS:jsData];
    }else if([action isEqual:@"loadingView"])
    {
        NSString* labelData = [dic valueForKey:@"data"];
      
      NSString* color= [dic valueForKey:@"color"];
        if(color){
              [JSBridge setFontColor:color];
        }
        if(labelData){
          NSArray* nameArr = [NSArray arrayWithObjects: labelData, nil];
                 [JSBridge setTips:nameArr];
        }
         
          NSString* percent= [dic valueForKey:@"percent"];
      if(percent){
          int intString = [percent intValue];
          [JSBridge loading:[NSNumber numberWithInt:intString]];
      }
      
        //  [JSBridge showTextInfo:[NSNumber numberWithInt:1]];
         
    }
    else{
         [[conchRuntime GetIOSConchRuntime] runJS:postAction];
    }
  });
}


+(void)loadGameUrl:(NSString*)message
{
  NSData*jsonData = [[JXHelper getAppData] dataUsingEncoding:NSUTF8StringEncoding];
  NSError*err;
  NSDictionary* dic = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&err];
  NSString* action = [dic valueForKey:@"gameUrl"];
  NSString* isLobbyOk=[dic valueForKey:@"isLobbyOk"];
  NSString* postAction =  [NSString stringWithFormat:@"appCallBack('%@')",action];
  [[conchRuntime GetIOSConchRuntime] runJS:postAction];
  if([isLobbyOk isEqual:@"true"]){
//     NSArray* nameArr = [NSArray arrayWithObjects: @"游戏正在努力更新中，请耐心等待！"];
//     [JSBridge setTips:nameArr];
//     [JSBridge showTextInfo:[NSNumber numberWithInt:1]];
  }
}
@end

