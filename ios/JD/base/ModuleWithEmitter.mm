#import "ModuleWithEmitter.h"
#import "AppDelegate.h"
@implementation ModuleWithEmitter
{
    bool hasListeners;
}

  
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onMessage"];
}

// Will be called when this module's first listener is added.
-(void)startObserving {
  hasListeners = YES;
  AppDelegate * appDelegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
  appDelegate.myEmitter = self;
  
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
  hasListeners = NO;
}



- (void)sendEvent:(NSString*)message {
   //if (hasListeners){
       [self sendEventWithName:@"onMessage" body:@{@"NAME": message}];
       NSLog(@"onMessage====%@",message);
   //}
}

@end
