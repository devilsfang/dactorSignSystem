package servlet.inDataBean;

public class AppMessageInDataBean {
	 String userId;
	 String recordId;
	 String caseHisId;
	 String diagnoseId;
	 String messageCode;
	 String type;
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getRecordId() {
		return recordId;
	}
	public void setRecordId(String recordId) {
		this.recordId = recordId;
	}
	public String getCaseHisId() {
		return caseHisId;
	}
	public void setCaseHisId(String caseHisId) {
		this.caseHisId = caseHisId;
	}
	public String getDiagnoseId() {
		return diagnoseId;
	}
	public void setDiagnoseId(String diagnoseId) {
		this.diagnoseId = diagnoseId;
	}
	public String getMessageCode(AppMessageInDataBean inData) {
		String recordIdStr="0000000000".concat(inData.recordId);
		recordIdStr=recordIdStr.substring(recordIdStr.length()-10);
		String caseHisIdStr="0000000000".concat(inData.caseHisId);
		caseHisIdStr=caseHisIdStr.substring(caseHisIdStr.length()-10);
		String diagnoseIdStr="0000000000".concat(inData.diagnoseId);
		diagnoseIdStr=diagnoseIdStr.substring(diagnoseIdStr.length()-10);
		String messageCode=recordIdStr.concat(caseHisIdStr).concat(diagnoseIdStr);
		return messageCode;
	}
	public String getMessageCode() {
		return messageCode;
	}
	public void setMessageCode(String recordId,String caseHisId,String diagnoseId) {
		String recordIdStr="0000000000".concat(recordId);
		recordIdStr=recordIdStr.substring(recordIdStr.length()-10);
		String caseHisIdStr="0000000000".concat(caseHisId);
		caseHisIdStr=caseHisIdStr.substring(caseHisIdStr.length()-10);
		String diagnoseIdStr="0000000000".concat(diagnoseId);
		diagnoseIdStr=diagnoseIdStr.substring(diagnoseIdStr.length()-10);
		String messageCode=recordIdStr.concat(caseHisIdStr).concat(diagnoseIdStr);
		this.messageCode = messageCode;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}

}
