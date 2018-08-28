package socket.util;

import java.io.IOException;
import java.lang.reflect.Method;
import java.net.ServerSocket;
import java.net.Socket;


/**
 * 端口监听服务进程
 * @ClassName PortListenService 
 * @author hllian
 * @Date Jan 4, 2015 6:43:47 PM
 */
public class PortListenService {
	
	/**
	 * 默认构造方法
	 * @param port 监听端口
	 * @param serviceClass 服务进程
	 * @throws IOException
	 */
	public PortListenService(int port, Class<?> serviceClass) throws IOException {
		ServerSocket serverSocket = null;
		try {
			serverSocket = new ServerSocket(port);
			
            while (true) {
                // 监听端口，等待接入  
                Socket socket = serverSocket.accept();
                // 当accept() 返回数据后，将会话交给线程处理
                // 执行服务init方法进行连接初始化
                Method runMethod = serviceClass.getMethod("init", Socket.class);
                runMethod.invoke(serviceClass.newInstance(), socket);
            }  
        } catch (Exception e) {
			e.printStackTrace();
		} finally {
        	// 关闭监听端口 
        	serverSocket.close(); 
        }
	}
}
