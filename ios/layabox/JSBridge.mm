#import "JSBridge.h"
#import "AppDelegate.h"
#import <conchRuntime.h>
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

+(void)loadGameUrl:(NSString*)data
{
    NSLog(@"loadGameUrl=====%@",data);
      dispatch_async(dispatch_get_main_queue(), ^{
          //ui thread
            NSString* retStr=@"https://download.jwyxw.net/ios/gameUat/index.js";
           // [[conchRuntime GetIOSConchRuntime] callbackToJSWithClass:self.class methodName:@"testAsyncCallback:" ret:retStr];
          NSString* str=@"appCallBack('https://download.jwyxw.net/ios/gameUat/index.js')";
            [[conchRuntime GetIOSConchRuntime] runJS:str];
            // [[conchRuntime GetIOSConchRuntime] callbackToJSWithObject:self methodName:@"testAsyncCallback:" ret:retStr];
      });

}
@end

