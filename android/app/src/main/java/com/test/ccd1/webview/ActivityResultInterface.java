package com.test.ccd1.webview;

import android.content.Intent;

public interface ActivityResultInterface {
    void callback(int requestCode, int resultCode, Intent data);

}
