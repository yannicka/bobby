package fr.yannicka.bobby

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import fr.yannicka.bobby.ui.theme.BobbyTheme

class MainActivity : ComponentActivity() {
    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        enableEdgeToEdge()

        WindowCompat.setDecorFitsSystemWindows(window, false)

        WindowInsetsControllerCompat(window, window.decorView).let {
            it.hide(WindowInsetsCompat.Type.systemBars())

            it.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (::webView.isInitialized && webView.canGoBack()) {
                    webView.goBack()
                } else {
                    finish()
                }
            }
        })

        setContent {
            BobbyTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { _ ->
                    AndroidView(
                        modifier = Modifier.fillMaxSize(),
                        factory = { context ->
                            WebView(context).also {
                                webView = it
                                it.webViewClient = WebViewClient()
                                it.settings.javaScriptEnabled = true
                                it.settings.domStorageEnabled = true
                                it.overScrollMode = WebView.OVER_SCROLL_NEVER
                                it.loadUrl("file:///android_asset/webview/index.html")
                            }
                        }
                    )
                }
            }
        }
    }

    override fun onDestroy() {
        if (::webView.isInitialized) {
            webView.destroy()
        }

        super.onDestroy()
    }
}
