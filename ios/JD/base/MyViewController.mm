//
//  MyViewController.m
//  card
//
//  Created by taven on 2019/3/29.
//  Copyright © 2019 JD. All rights reserved.
//

#import "MyViewController.h"

@interface MyViewController ()

@end

@implementation MyViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (BOOL)prefersHomeIndicatorAutoHidden{
  return YES;
}

- (void)fitFrameForChildViewController:(UIViewController *)chileViewController{
  CGRect frame = self.contentView.frame;
  frame.origin.y = 0;
  chileViewController.view.frame = frame;
}



- (void)addGameLobbyControl:(NSString*)data {
  if(NULL==self.gameViewControl){
    ViewController* pViewController  = [[ViewController alloc] init];
    self.gameViewControl=pViewController;
    self.contentView=pViewController.view;
    [self addChildViewController:pViewController];
    [self.view addSubview:self.contentView];
  }
}


- (void)jumpToHome:(NSString*)data {
  CGRect frame = self.contentView.frame;
  frame.origin.y = 0;
  self.gameViewControl.view.frame = frame;
 
}


- (void)jumpToRN:(NSString*)data {
 CGRect frame = self.contentView.frame;
  frame.origin.y = 999;
  self.gameViewControl.view.frame = frame;
}


/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
