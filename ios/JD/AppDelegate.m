#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import <CodePush/CodePush.h>
#import "RNUMConfigure.h"
#import <Bugly/Bugly.h>
#import "AppDelegate+JDBase.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <WebKit/WebKit.h>
#import <OpenInstallSDK.h>
#import <SplashScreen.h>
#import <UMShare/UMShare.h>
#import "Orientation.h"

@implementation AppDelegate

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  application.applicationIconBadgeNumber = 0;
  self.launchOptions = launchOptions;
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  [self loadRootController];
  [self.window makeKeyAndVisible];
  [UIDevice currentDevice].batteryMonitoringEnabled = true;
  dispatch_time_t delay = dispatch_time(DISPATCH_TIME_NOW, NSEC_PER_SEC * 3);
       dispatch_after(delay, dispatch_get_main_queue(), ^(void){
            [SplashScreen hide];
           // do work in the UI thread here
       });
  #ifdef DEBUG
    //do sth.
  #else
     [SplashScreen show];
  #endif


  return YES;
}



- (UIViewController *)rootController {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 替换换成壳的入口 返回一个controller
  UIViewController *nativeRootController = [[UIViewController alloc] init];
  nativeRootController.view.backgroundColor = [UIColor whiteColor];
  return nativeRootController;
}

+(NSArray *)getBBQArray {
#pragma mark ⚽︎ ❤️❤️❤️ ⚽︎ 一定要返回一组正确请求地址
  
  return @[@"https://www.ba2d16.com",
           @"https://www.aa2d16.com",
           @"https://www.ca2d16.com"];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation{
	//openURL2
  NSString *urlString = [url absoluteString];
    if ([urlString hasPrefix:@"wx"]) {
      [[UMSocialManager defaultManager] handleOpenURL:url];
  }else{
      [OpenInstallSDK handLinkURL:url];
  }
	//[OpenInstallSDK handLinkURL:url];
	return YES;
}
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler{
  
	[OpenInstallSDK continueUserActivity:userActivity];
	return YES;
}

//-(BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
//{
//      return [self openLiveOpenURL:url];
//}

-(BOOL)application:(UIApplication *)application handleOpenURL:(NSURL *)url {
      return [self openLiveOpenURL:url];
}


- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<NSString*, id> *)options NS_AVAILABLE_IOS(9_0){
      return [self openLiveOpenURL:url];
  
}

- (BOOL)openLiveOpenURL:(NSURL *)url {
  
      if (!url) return NO;
    [[UMSocialManager defaultManager] handleOpenURL:url];
  //      NSString *urlString = [url absoluteString];
  //
  //      if ([urlString hasPrefix:@"wx"]) {
  //           return [WXApi handleOpenURL:url delegate:self];
  //        }else if ([urlString hasPrefix:@"wb"]) {
  //              [[UMSocialManager defaultManager] handleOpenURL:url];
  //          }
  //
  //      //判断是否是通过LinkedME的UrlScheme唤起App
  //      else if ([urlString rangeOfString:@"click_id"].location != NSNotFound)
  //        {
  //            return [[LinkedME getInstance] handleDeepLink:url];
  //         }
      return YES;
}

@end
@implementation NSURLRequest(DataController)
+ (BOOL)allowsAnyHTTPSCertificateForHost:(NSString *)host
{
  return YES;
}

@end

