// src/utils/auth.js

export async function Authenticate(crmUrl) 
{        
    
        try 
        {        
            const response = await fetch('https://crmtest.agrotec.cz/api/data/v9.1/WhoAmI', 
            {
                method: 'GET',                 
                credentials: 'include',            
                headers: 
                {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) 
            {            
                const data = await response.json();
                return data; // Uživatel je přihlášen
            } 
            else if (response.status === 401) 
            {
                console.log("401 Redirecting to login page");
                return null; // Uživatel není přihlášen
            }
            else if (response.status === 500) 
            {
                console.log("500 Redirecting to login page");
                return null;               
            }
            console.error('Authentication failed with status:', response.status);
            return null;
        } 
        catch (error) 
        {
            console.error('Error during authentication:', error);
            return null;
        }    
}

export function initiateLogin(app_url, crmUrl) {
    console.log("Initiating login with ADFS");
    const ADFS_URL = "https://fs.agrotec.cz/adfs/ls/";    
    const sessionId = crypto.randomUUID();
    
    const queryParams = new URLSearchParams({
        wa: "wsignin1.0",
        wtrealm: crmUrl,
        wctx: "rm=1&id=" + sessionId + "&ru=" + crmUrl + "/ISV1/"+ app_url + "&crmorgid=445c398e-61c3-427f-828c-12052103f0e4",
        wct: new Date().toISOString().split('.')[0] + 'Z',
        wauth: "urn:oasis:names:tc:SAML:1.0:am:password",
        wreply: crmUrl + "/ISV1/"+ app_url,    
    });
    
    const loginUrl = `${ADFS_URL}?${queryParams.toString()}`;    
    window.location.href = loginUrl; // Přesměrování uživatele na přihlašovací stránku
}

export async function logout() {
    try {

        document.cookie = "MSISAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "MSISAuth1=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        
        const signoutUrl = "https://crmtest.agrotec.cz/main.aspx?signout=1";
        const response = await fetch(signoutUrl, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            console.log("Logout successful, cookies cleared.");
        } else {
            console.error("Logout request failed with status:", response.status);
        }

        // Po úspěšném odhlášení proveďte přesměrování nebo jiné akce
        window.location.href = '/ISV1/index.html?isAuthenticated=false'; // Přesměrování na přihlašovací stránku
    } catch (error) {
        console.error("Error during logout:", error);
    }
    window.location.href = '/ISV1/index.html?isAuthenticated=false'; // Přesměrování na přihlašovací stránku
}

export function logoutFromAdfs(app_url, crmUrl) {
    console.log("Initiating logout with ADFS");
    const ADFS_URL = "https://fs.agrotec.cz/adfs/ls/";    
    
    const queryParams = new URLSearchParams({
        wa: "wsignout1.0",        
        wreply: crmUrl + "/ISV1/"+ app_url 
    });
    
    const loginUrl = `${ADFS_URL}?${queryParams.toString()}`;    
    window.location.href = loginUrl; // Přesměrování uživatele na přihlašovací stránku
}