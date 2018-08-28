package common.util;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.apache.commons.lang.StringUtils;


/**
 * Desc: 工具类 Time: 20:44:55
 */
public class Tools {
	private static String format = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 得到按指定格式的系统当前时间
	 *
	 * @param dateFormat
	 *            日期格式
	 * @return 格式化的日期字符串
	 */
	public static String getSysDate(String dateFormat) {
		if (dateFormat == null || "".equals(dateFormat)) {
			dateFormat = "yyyy-MM-dd HH:mm:ss";
		}
		Calendar date = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
		String dateStr = sdf.format(date.getTime());
		return dateStr;
	}
	/**
	 * 把格式为dataFormat的字符串转换为想要的字符串格式
	 *
	 * @param dateStr
	 *            数据
	 * @param dataFormat
	 *            数据格式 默认为：yyyy-MM-dd HH:mm:ss
	 * @param formatStr
	 *            目标格式
	 * @return
	 */
	public static String formatDateStr(String dateStr, String dataFormat,
									   String formatStr) {

		if (StringUtils.isEmpty(dataFormat)) {
			dataFormat = format;
		}

		SimpleDateFormat df = new SimpleDateFormat(formatStr);

		Date date = null;
		try {
			date = new SimpleDateFormat(dataFormat).parse(dateStr);

		} catch (ParseException e) {
			e.printStackTrace();
		}
		return df.format(date);
	}

	/**
	 * 获取指定长度的随机数
	 *
	 * @Title: genRandomNum
	 * @author Administrator
	 * @date May 28, 2013 2:43:29 PM
	 * @Description: TODO
	 * @param
	 * @param pwd_len
	 * @param
	 * @return
	 * @return String
	 * @throws
	 */
	public static String genRandomNum(int pwd_len) {
		// 35是因为数组是从0开始的，26个字母+10个数字
		final int maxNum = 10;
		int i; // 生成的随机数
		int count = 0; // 生成的密码的长度
		char[] str = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

		StringBuffer pwd = new StringBuffer("");
		Random r = new Random();
		while (count < pwd_len) {
			// 生成随机数，取绝对值，防止生成负数，
			i = Math.abs(r.nextInt(maxNum)); // 生成的数最大为maxNum-1

			if (i >= 0 && i < str.length) {
				pwd.append(str[i]);
				count++;
			}
		}
		return pwd.toString();
	}
	
}