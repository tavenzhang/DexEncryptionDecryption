#import "ModuleWithEmitter.h"

@implementation ModuleWithEmitter
  
RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents {
  return @[@"onMessage"];
}


- (void)sendEvent:(NSString*)message {
  [self sendEventWithName:@"onMessage" body:@{@"NAME": message}];
}

@end
