## JWT Library
- node.js
  - https://www.npmjs.com/package/jsonwebtoken
- C#
  - https://www.nuget.org/packages/System.IdentityModel.Tokens.Jwt/

## App Serviceの認証/承認機能でログイン後のリダイレクトURLを変更するには
```
/.auth/login/<provider>?post_login_redirect_url=YOUR_URL
```
ちなみにログアウト時のURLを変更するには
```
/.auth/logout?post_logout_redirect_url=YOUR_URL
```

### Azure ADのマルチテナント
基本的には [マルチテナント アプリケーション パターンを使用してすべての Azure Active Directory ユーザーがサインインできるようにする方法](https://docs.microsoft.com/ja-jp/azure/active-directory/develop/active-directory-devhowto-multi-tenant-overview)
App Serviceの認証/承認機能と統合する場合は、App Serciceの「Active Directory 認証」の「発行者のURL」を ```https://sts.windows.net/common/``` に設定
