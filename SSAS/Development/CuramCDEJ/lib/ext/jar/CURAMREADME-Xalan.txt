The Xalan jar files shipped with CÎáÎõÎéram have been modified as follows:

serializer.jar - contains fixes for the following issues:

XALANJ-1529 - Serializer should cache classes loaded with Class.forName(classname) 
XALANJ-1785 - getSystemId should return null if setSystemId was not called.

For XALANJ-1529 the org/apache/xml/serializer/SerializerFactory.class has been modified as shown by the following diff output:
31a32,34
> import java.util.Map;
> import java.util.HashMap;
>
74a78,82
>   /*
>    * Class cache
>    */
>   protected static Map<String, Class> serializerClassCache = new HashMap<String, Class> ();
>
127,129c135,141
<         ClassLoader loader = ObjectFactory.findClassLoader();
<
<         Class cls = ObjectFactory.findProviderClass(className, loader, true);
---
>       Class cls = serializerClassCache.get(className);
>       if (cls == null) {
>           ClassLoader loader = ObjectFactory.findClassLoader(); // Was 127
>         //129: Class cls = ObjectFactory.findProviderClass(className, loader, true);
>         cls = ObjectFactory.findProviderClass(className, loader, true); // Was 129
>       serializerClassCache.put(className, cls);
>       }
157c169,174
<                   cls = ObjectFactory.findProviderClass(className, loader, true);
---
>                   //157: cls = ObjectFactory.findProviderClass(className, loader, true);
>                 cls = serializerClassCache.get(className);
>                 if (cls == null) {
>                    ClassLoader loader = ObjectFactory.findClassLoader();
>                   serializerClassCache.put(className, cls);
>                 }


For XALANJ-1785 the org/apache/xml/serializer/TreeWalker.class has been modified as shown by the following diff output:
52a53,62
>   /** Dummy xsl file name */
>   protected static String dummyXSL;
>   static {
>     try {
>       dummyXSL = System.getProperty("user.dir") + File.separator + "dummy.xsl";
>     }
>     catch (SecurityException se) {// user.dir not accessible from applet
>     }
>   }
>
105c115,118
<             m_locator.setSystemId(System.getProperty("user.dir") + File.separator + "dummy.xsl");
---
>             // m_locator.setSystemId(System.getProperty("user.dir") + File.separator + "dummy.xsl");
>             if (dummyXSL != null) {
>               m_locator.setSystemId(dummyXSL);
>             }
116c129,132
<                   m_locator.setSystemId(System.getProperty("user.dir") + File.separator + "dummy.xsl");
---
>                    // m_locator.setSystemId(System.getProperty("user.dir") + File.separator + "dummy.xsl");
>                    if (dummyXSL != null) {
>                      m_locator.setSystemId(dummyXSL);
>                    }


xalan.jar - contains a fix for the following issue:

XALANJ-2533 - DTMManager.newInstance issue in a java multithreaded application: excessive ClassLoader, threads lock wait, no cache 

For XALANJ-2533 the org/apache/xml/dtm/ObjectFactory.class has been modified as shown by the following diff output:
28a29,30
> import java.util.HashMap;
> import java.util.Map;
51a54,105
>     /*
>      * Cache for factory class objects.
>      */
>     protected static Map<FactoryClassCacheKey, Class> factoryClassCache = new HashMap<Factory
>     protected static class FactoryClassCacheKey {
>         @Override
>         public int hashCode() {
>             final int prime = 31;
>             int result = 1;
>             result = prime * result
>                     + ((factoryId == null) ? 0 : factoryId.hashCode());
>             result = prime
>                     * result
>                     + ((fallbackClassName == null) ? 0 : fallbackClassName
>                             .hashCode());
>             result = prime
>                     * result
>                     + ((propertiesFilename == null) ? 0 : propertiesFilename
>                             .hashCode());
>             return result;
>         }
>
>         @Override
>         public boolean equals(Object obj) {
>             if (this == obj)
>                 return true;
>             if (obj == null)
>                 return false;
>             if (getClass() != obj.getClass())
>                 return false;
>             FactoryClassCacheKey other = (FactoryClassCacheKey) obj;
>             if (factoryId == null) {
>                 if (other.factoryId != null)
>                     return false;
>             } else if (!factoryId.equals(other.factoryId))
>                 return false;
>             if (fallbackClassName == null) {
>                 if (other.fallbackClassName != null)
>                     return false;
>             } else if (!fallbackClassName.equals(other.fallbackClassName))
>                 return false;
>             if (propertiesFilename == null) {
>                 if (other.propertiesFilename != null)
>                     return false;
>             } else if (!propertiesFilename.equals(other.propertiesFilename))
>                 return false;
>             return true;
>         }
>
>         public String factoryId, propertiesFilename, fallbackClassName;
>     }
>
207a262,271
>         // Check cache
>         FactoryClassCacheKey key = new FactoryClassCacheKey();
>         key.factoryId = factoryId;
>         key.propertiesFilename = propertiesFilename;
>         key.fallbackClassName = fallbackClassName;
>         Class result = factoryClassCache.get(key);
>         if (result != null) {
>             return result;
>         } else {
>         // If not in cache ...
223a288,289
>             // Add to cache
>             factoryClassCache.put(key, providerClass);
232a299
>         } // End cache path


<end>


