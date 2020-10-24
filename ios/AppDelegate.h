//
//  JD
//
//  Created by Sam on 10/03/2018.
//  Copyright © 2018 JD. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTRootView.h>
#import "LaunchView.h"
#import "MyViewController.h"
#import "ModuleWithEmitter.h"
#import <RCTJPushModule.h>
#import "JSBridge.h"
static NSString * const JDNight = @"12night";

@interface AppDelegate : UIResponder <UIApplicationDelegate,JPUSHRegisterDelegate>

@property (nonatomic, strong) UIWindow *window;
@property (nonatomic, strong) NSDictionary *launchOptions;
@property(nonatomic,strong) RCTRootView *rootView;
@property(nonatomic,strong) ModuleWithEmitter* myEmitter;
@property(nonatomic,strong) MyViewController* myRootVC;
@property(nonatomic,assign) BOOL isLoadForJS;
@property(nonatomic,assign) BOOL isLoad;
@property(nonatomic,assign) BOOL isMute;
@property(nonatomic,assign) BOOL isLobbyInit;




@property (strong, strong) LaunchView *launchView;

- (UIViewController *)rootController;
- (void *)registAppPush:(NSString *)jkey:(NSString *)channel;
- (void *)registUMeng:(NSString *)ukey:(NSString *)channel;
- (void *)registUMengShare:(NSString *)appId:(NSString *)api;
+(NSArray *)getBBQArray;
// Override to return a child view controller or nil. If non-nil, that view controller's home indicator auto-hiding will be used. If nil, self is used. Whenever the return value changes, -setNeedsHomeIndicatorAutoHiddenUpdate should be called.

@end
