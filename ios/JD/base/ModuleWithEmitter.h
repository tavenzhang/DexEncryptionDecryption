#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ModuleWithEmitter : RCTEventEmitter <RCTBridgeModule>
- (void)sendEvent:(NSString*)message ;
@end
