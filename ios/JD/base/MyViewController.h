//
//  MyViewController.h
//  card
//
//  Created by taven on 2019/3/29.
//  Copyright © 2019 JD. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ViewController.h"

NS_ASSUME_NONNULL_BEGIN

@interface MyViewController : UIViewController
 @property (nonatomic, strong) UIView *contentView;
 @property (nonatomic, strong) ViewController* gameViewControl;

- (void)addGameLobbyControl:(NSString*)data ;
- (void)jumpToHome:(NSString*)data ;
- (void)jumpToRN:(NSString*)data ;

@end

NS_ASSUME_NONNULL_END
