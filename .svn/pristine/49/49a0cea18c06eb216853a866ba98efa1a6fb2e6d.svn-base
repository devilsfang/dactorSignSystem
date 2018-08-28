package common.util;

public class StringUtil {
	public static boolean isEmpty(String str){
		if(str==null)
			return true;
		if("".equals(str.trim()))
			return true;
		return false;
	}
	
	public static String cleanWinningJSON(String jsonStr){
		jsonStr=jsonStr.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>", "");
		jsonStr=jsonStr.replace("<string xmlns=\"http://tempuri.org/\">", "");
		jsonStr=jsonStr.replace("</string>", "");
		jsonStr=jsonStr.trim();
		int end=jsonStr.length()-1;
		return jsonStr.substring(1,end);
	}
}
