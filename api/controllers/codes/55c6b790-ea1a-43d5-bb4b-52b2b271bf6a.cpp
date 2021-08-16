#include <bits/stdc++.h>
typedef long long int ll;
using namespace std;

int main()
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    ll t; cin>>t;
    while(t--){
        ll n,x,k;
        cin>>n>>x>>k;
        if((x%k==0)||(n+1-x)%k==0){
            cout<<"YES\n";
        }
        else
        cout<<"NO\n";
    }
    return 0;
}