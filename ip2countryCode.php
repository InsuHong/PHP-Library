//IP to countryCode
// USE whois.kisa.or.kr Api library
if(!function_exists("fSearchCountryCode"))
{
  function fSearchCountryCode($ip) 
  {
    $key = "your whois keycode";   //Requested key code
    $dataFormat = "json";
    $url ="http://whois.kisa.or.kr/openapi/ipascc.jsp?query=".$ip."&key=".$key."&answer=".$dataFormat."";

    $ch = curl_init();
    curl_setopt($ch,CURLOPT_URL,$url); curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch,CURLOPT_NOSIGNAL, 1);
    //curl_setopt($ch,CURLOPT_POST, 1); //Method = POST.. If this line doesn't exist GET

    $data = curl_exec($ch);
    $curl_errno = curl_errno($ch);
    $curl_error = curl_error($ch);

    curl_close($ch);
    $decodeJsonData = json_decode($data, true);
    return $decodeJsonData['whois']['countryCode'];
  }  
}