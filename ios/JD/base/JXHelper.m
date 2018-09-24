//
//  JXHelper.m
//  JD-Lottery
//
//  Created by Sam on 2018/9/18.
//  Copyright © 2018年 JD. All rights reserved.
//

#import "JXHelper.h"
#import "JXKeyChain.h"

static NSString * const KEY_IN_KEYCHAIN = @"com.JX.app.allinfo";
static NSString * const KEY_PASSWORD = @"com.JX.app.password";

@implementation JXHelper
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getAffCode:(RCTResponseSenderBlock)callback)
{
  NSString * str = [JXHelper getAffCode];
  callback(@[str]);
}

+ (NSString *)getAffCode{
  NSDictionary *tempInfoDict = [[NSBundle mainBundle] infoDictionary];
  NSString *Affcode = [tempInfoDict objectForKey:@"Affcode"];
  return Affcode;
}

RCT_EXPORT_METHOD(getCFUUID:(RCTResponseSenderBlock)callback)
{
  NSString * str = [JXHelper getCFUUID];
  callback(@[[NSNull null], str]);
}

+(NSString *)getCFUUID
{
  NSArray* paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
  NSString* documentsDirectory = [paths objectAtIndex:0];
  NSString* initDataPath = [NSString stringWithFormat:@"%@/CFUUID.dat", documentsDirectory];
  
  NSDictionary * dic = [NSDictionary dictionaryWithContentsOfFile:initDataPath];
  
  
  if (dic == nil|| ![dic objectForKey:@"CFUUID"])
  {
    CFUUIDRef cfuuid = CFUUIDCreate(kCFAllocatorDefault);
    NSString *cfuuidString = (NSString*)CFBridgingRelease(CFUUIDCreateString(kCFAllocatorDefault, cfuuid));
    
    NSString * uuid =  [JXHelper readKeyChainPassWord];
    
    if (uuid) {
      cfuuidString = uuid;
    }else
    {
      [JXHelper saveKeyChainPassWord:cfuuidString];
    }
    
    dic = [NSDictionary dictionaryWithObject:cfuuidString forKey:@"CFUUID"];
    
    if([dic writeToFile:initDataPath atomically:NO])
    {
      NSLog(@"CFUUID write to file succeed");
    }
    else
    {
      NSLog(@"CFUUID write to file error");
    }
    
    return cfuuidString;
    
  }else
  {
    return [dic objectForKey:@"CFUUID"];
  }
}
+(void)saveKeyChainPassWord:(NSString *)password
{
  NSMutableDictionary *usernamepasswordKVPairs = [NSMutableDictionary dictionary];
  [usernamepasswordKVPairs setObject:password forKey:KEY_PASSWORD];
  [JXKeyChain save:KEY_IN_KEYCHAIN data:usernamepasswordKVPairs];
}

+(id)readKeyChainPassWord
{
  NSMutableDictionary *usernamepasswordKVPair = (NSMutableDictionary *)[JXKeyChain load:KEY_IN_KEYCHAIN];
  return [usernamepasswordKVPair objectForKey:KEY_PASSWORD];
}

+(void)deletePassWord
{
  [JXKeyChain delete:KEY_IN_KEYCHAIN];
}
@end
