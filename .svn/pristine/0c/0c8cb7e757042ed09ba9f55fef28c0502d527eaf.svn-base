package socket.service;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


import common.Config;
import socket.service.appMessage.AppMessageSocketService;
import socket.util.PortListener;

public class ListenerManager implements ServletContextListener{
	public void contextDestroyed(ServletContextEvent e) {
	}

	public void contextInitialized(ServletContextEvent e) {
		// 初始化appMessage接口
		PortListener.listen(Config.getInstance().AppMessagePort, AppMessageSocketService.class);
		System.out.println("------------------------------------------------appMessage 监听已开启");

	}
}
