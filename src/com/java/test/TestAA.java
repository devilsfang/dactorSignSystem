package test;

import java.util.Date;

import org.junit.Test;

import com.sun.jmx.snmp.Timestamp;

import servlet.outDataBean.LoginOutDataBean;

import net.sf.json.JSONObject;

public class TestAA {

	@Test
	public void testA(){
		 Long nowTime = new Date().getTime();
		 
		 Long nowTime2 = new Date().getTime();
		 System.out.println(nowTime2-nowTime);
		
	}
}
