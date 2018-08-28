package socket.util;

import java.io.IOException;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * 端口监听类
 * 为每一个端口开启单独的线程监听
 * @ClassName PortListener 
 * @author hllian
 * @Date Jan 4, 2015 5:22:37 PM
 */
public class PortListener{
	private static Log log = LogFactory.getLog(PortListener.class);

	/**
	 * 监听指定端口
	 * @MethodName listen  
	 * @author hllian
	 * @Date Jan 4, 2015 5:51:38 PM
	 * @param port 要监听的端口号
	 * @param serviceClass 接收数据对应的处理类
	 */
	public static void listen(final int port, final Class<?> serviceClass) {
		log.info("Listening port:" + port + " in new Thread.");
		
		// 为每个端口开启新的线程
		new Thread(new Runnable() {
			public void run() {
				try {
					// 开启监听监听服务
					new PortListenService(port, serviceClass);
				} catch (IOException e) {
					log.error("端口监听打开失败！");
					e.printStackTrace();
				}
			}
		}).start();
	}
	
}
