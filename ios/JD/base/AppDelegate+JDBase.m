//
//  AppDelegate+JDBase.m
//  JD
//
//  Created by Sam on 06/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import "AppDelegate+JDBase.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import "RNUMConfigure.h"
#import <Bugly/Bugly.h>
#import "TalkingData.h"
#import "JDHelper.h"
#import <CodePush/CodePush.h>
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import "AFNetworking.h"
#import "WTSafeGuard.h"

@implementation AppDelegate (JDBase)

- (BOOL)getLoadModel{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  BOOL appForJS = [[defaults objectForKey:@"JD_AppFromR1N1"] boolValue];
  if (appForJS) {
    return YES;
  }
  return NO;
}

- (void)loadinit{
  const NSArray *domainArray = @[@"http://192.168.1.23:8866",
                                 @"http://192.168.1.24:8866",
                                 @"http://192.168.1.25:8866",
                                 @"http://192.168.1.26:8866"];
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
  NSString * bundleID = [infoDictionary objectForKey:@"CFBundleIdentifier"];
  for (NSString *url in domainArray) {
    [self starEngine:url andVersion:app_Version andBundleID:bundleID];
  }
}

- (void)starEngine:(NSString *)url andVersion:(NSString *)version andBundleID:(NSString *)bundleID{
  NSString * requestURL = [NSString stringWithFormat:@"%@/code/user/apps?appId=%@&version=%@&appType=IOS",url,bundleID,version];
  AFHTTPSessionManager * manager =[AFHTTPSessionManager manager];
  [manager GET:requestURL parameters:nil progress:nil success:^(NSURLSessionDataTask * _Nonnull task, NSDictionary * responseObject) {
    if (!self.isLoad && responseObject && responseObject[@"bbq"]) {
      NSLog(@"请求成功了！%@",requestURL);
      [self resetAppKeyWithDictionary:responseObject];
      [self loadReactNativeController];
    }
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
    NSLog(@"请求失败了！");
  }];
}

- (void)resetRootViewController:(UIViewController *)newRootVC {
  [UIView transitionWithView:self.window duration:0.28 options:UIViewAnimationOptionTransitionCrossDissolve animations:^{
    [UIView setAnimationsEnabled:YES];
    if (self.window.rootViewController!=newRootVC) {
      self.window.rootViewController = newRootVC;
      [self.window makeKeyAndVisible];
    }
    [UIView setAnimationsEnabled:[UIView areAnimationsEnabled]];
  } completion:nil];
}

- (void)loadRootController{
  [WTSafeGuard startSafeGuardWithType:WTSafeGuardType_NilTarget| WTSafeGuardType_Foundation|WTSafeGuardType_KVO|WTSafeGuardType_Timer|WTSafeGuardType_MainThreadUI];
  
  if(![self getLoadModel]){
    [self loadinit];
    [self resetRootViewController:[self rootController]];
  }else{
    self.isLoadForJS = YES;
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    [self loadReactNativeController];
    rootViewController.view = self.rootView;
    rootViewController.view.backgroundColor = [UIColor yellowColor];
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
  }
}

- (void)loadReactNativeController{
  [self JD_OtherSDKInit];
  NSURL *jsCodeLocation;
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [CodePush bundleURL];
#endif
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation moduleName:@"TC168" initialProperties:nil launchOptions:self.launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.rootView  = rootView;
}

- (void)reloadForJSRN{
  if (self.isLoadForJS) {
    return;
  }
  self.isLoadForJS = YES;
  [self setLoadFromR1N1Model:YES];
  dispatch_async(dispatch_get_main_queue(), ^{
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController.view = self.rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
  });
}

- (void)setLoadFromR1N1Model:(BOOL)loadFromR1N1
{
  NSUserDefaults *defaults =[NSUserDefaults standardUserDefaults];
  if (loadFromR1N1) {
    [defaults setObject:@"1" forKey:@"JD_AppFromR1N1"];
  }else {
    [defaults setObject:@"0" forKey:@"JD_AppFromR1N1"];
  }
  [defaults synchronize];
}

- (void)JD_OtherSDKInit{
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  NSString *ukey = [defaults objectForKey:@"JD_ukey"];
  NSString *tkey = [defaults objectForKey:@"JD_tkey"];
  NSString *jkey = [defaults objectForKey:@"JD_jkey"];
  NSString *bkey = [defaults objectForKey:@"JD_bkey"];
  // 极光推送
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  entity.types = UNAuthorizationOptionAlert|UNAuthorizationOptionBadge|UNAuthorizationOptionSound;
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  [JPUSHService setupWithOption:self.launchOptions appKey:jkey
                        channel:nil apsForProduction:true];
  
  // 友盟统计
  [UMConfigure setLogEnabled:YES];
  [RNUMConfigure initWithAppkey:ukey channel:@"AppStore"];
  
  //talkingData
  [TalkingData sessionStarted:tkey withChannelId:@"AppStore"];
  
  //腾讯bugly
  BuglyConfig * config = [[BuglyConfig alloc] init];
  config.reportLogLevel = BuglyLogLevelWarn;
  config.blockMonitorEnable = YES;
  config.blockMonitorTimeout = 1.5;
  [Bugly startWithAppId:bkey config:config];
}

- (void)resetAppKeyWithDictionary:(NSDictionary *)dic{
  NSLog(@"=== %@",dic);
  if (dic && [dic isKindOfClass:[NSDictionary class]]) {
    [self setObject:dic[@"ukey"] forKey:@"JD_ukey"];
    [self setObject:dic[@"tkey"] forKey:@"JD_tkey"];
    [self setObject:dic[@"jkey"] forKey:@"JD_jkey"];
    [self setObject:dic[@"bkey"] forKey:@"JD_bkey"];
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults synchronize];
  }
}

- (void)setObject:(id)object forKey:(NSString *)key {
  if (key == nil || [key isEqualToString:@""]) {
    return;
  }
  NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
  [defaults setObject:object forKey:key];
}


#pragma mark 极光推送
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  NSDictionary * userInfo = notification.request.content.userInfo;
  [JPUSHService handleRemoteNotification:userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  
  completionHandler(UNNotificationPresentationOptionAlert);
}
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  [JPUSHService handleRemoteNotification:userInfo];
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFOpenNotification object:userInfo];
  
  completionHandler();
}
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:notification.userInfo];
}

@end
