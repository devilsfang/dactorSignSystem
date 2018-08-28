package plugins.winning;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import java.util.Timer;
import java.util.TimerTask;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 卫宁配置类
 * 
 * @author lst
 */
public class WinnigConfig {
	/** 默认配置文件 */
	private static final String DEFAULT_CONFIG_PATH = "winning.properties";

	private static String BaseUrl;
	
	public static String LoginUrl;
	public static String SignDetailUrl;

	public static String PatientDetailUrl;

	public static String QueryPatientUrl;

	public static String QueryRecordUrl;

	public static String SignHistoryOpinionUrl;

	public static String SignOpnionFillUrl;

	public static String QueryDocListUrl;

	public static String TreeUrl;
	

	/** log4j 日志记录对象 */
	private Log logger = LogFactory.getLog(WinnigConfig.class);
	/** 配置对象 */
	public static WinnigConfig instance = null;
	/** 配置文件对象 */
	private Properties properties;
	/** 定时器 */
	private Timer reloadTimer;

	/**
	 * 单例对象构造方法
	 */
	private WinnigConfig() {
		reloadTimer = new Timer();
		loadPropertiesFromSrc();
		TimerTask task = new TimerTask() {
			public void run() {
				loadPropertiesFromSrc();
			}
		};
		reloadTimer.schedule(task, 10000L, 10000L);
	}

	/**
	 * 获取配置对象实例
	 * 
	 * @return {@link winnigCnfig} 微信配置类
	 */
	public static WinnigConfig getInstance() {
		if (instance == null) {
			instance = new WinnigConfig();
		}
		return instance;
	}

	public void loadPropertiesFromSrc() {
		InputStream inStream = null;
		try {
			inStream = WinnigConfig.class.getClassLoader().getResourceAsStream(DEFAULT_CONFIG_PATH);
			if (inStream != null) {
				this.properties = new Properties();
				this.properties.load(inStream);
				loadProperties(this.properties);
			} else {
				throw new FileNotFoundException("Not found WinningConfig properties");
			}
		} catch (Exception e) {
			logger.error("Load WinningConfig properties failure", e);
		} finally {
			if (inStream != null) {
				try {
					inStream.close();
				} catch (IOException e) {
					logger.error("Close inputstream failure", e);
				}
			}
		}
	}

	public void loadPropertiesFromPath(String path) {
		File file = new File(path);
		InputStream inStream = null;
		try {
			inStream = new FileInputStream(file);
			this.properties = new Properties();
			this.properties.load(inStream);
			loadProperties(this.properties);
		} catch (FileNotFoundException e) {
			logger.error("Not found WinningConfig properties: " + path, e);
		} catch (IOException e) {
			logger.error("Load WinningConfig properties failure", e);
		} finally {
			if (inStream != null) {
				try {
					inStream.close();
				} catch (IOException e) {
					logger.error("Close inputstream failure", e);
				}
			}
		}
	}

	private void loadProperties(Properties properties) {

		try {
//			logger.info("reload Winning Config-------------------------------------------");
			BaseUrl=properties.getProperty("BaseUrl");
			LoginUrl =BaseUrl+ properties.getProperty("LoginUrl");
			SignDetailUrl = BaseUrl+properties.getProperty("SignDetailUrl");
			QueryDocListUrl = BaseUrl+properties.getProperty("QueryDocListUrl");
			PatientDetailUrl = BaseUrl+properties.getProperty("PatientDetailUrl");
			QueryPatientUrl = BaseUrl+properties.getProperty("QueryPatientUrl");
			QueryRecordUrl = BaseUrl+properties.getProperty("QueryRecordUrl");
			SignHistoryOpinionUrl =BaseUrl+ properties.getProperty("SignHistoryOpinionUrl");
			SignOpnionFillUrl =BaseUrl+ properties.getProperty("SignOpnionFillUrl");
			TreeUrl =BaseUrl+ properties.getProperty("TreeUrl");
		} catch (Exception e) {
			logger.error("WinningConfig error");
		}

	}

}
