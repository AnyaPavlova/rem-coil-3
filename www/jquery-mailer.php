<?php
	header("Content-Type: text/html; charset=utf-8");
	
	# Configuration
	#
	define('DESTINATION', 'anjutalove@gmail.com');
	define('DESTINATION2', 'likamoon@list.ru');
	define('SCRIPT_URI',  'jquery-mailer.php');
		
	###############################################################
	
	function ok ($e = '') {
		header("Content-Type: application/json");
		print json_encode(array("status" => "ok", "error" => $e));
		exit();
	}
	
	function not_ok ($e) {
		header("Content-Type: application/json");
		print json_encode(array("status" => "not ok", "error" => $e));
		exit();
	}
		
	#Форма подписки
	if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST["formType"] == "subscribe" )
	{				
		
		$_subject = isset($_POST["formSubject"]) ? filter_var($_POST['formSubject'], FILTER_SANITIZE_STRING) :  null;		
		$subject = "Заявка с сайта Rem&Coil: " . $_subject ;	
		
		$message = "Информация:		
		Имя:            ".(isset($_POST["name"]) ?             filter_var($_POST['name'],            FILTER_SANITIZE_STRING) :  null)."		
		Компания:            ".(isset($_POST["company"]) ?             filter_var($_POST['company'],            FILTER_SANITIZE_STRING) :  null)."			
		E-mail:            ".(isset($_POST["email"]) ?             filter_var($_POST['email'],            FILTER_SANITIZE_STRING) :  null)." 
		Заявка: 				$_subject 
		Время заявки:       ".date("Y-m-d H:i:s")."
		";
		
		$headers =  "From: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Reply-To: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Content-type: text/plain; charset=\"utf-8\"" . "\r\n" .
		"X-Mailer: PHP/" . phpversion();

		if ( mail(DESTINATION, $subject, $message, $headers) && mail(DESTINATION2, $subject, $message, $headers) )
        ok();
		else
        not_ok("Ошибка. Возможно функция mail отключена. Обратитесь к хостинг-провайдеру.");		
	}	

	#Форма Обратной связи
	elseif ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST["formType"] == "feedback" )
	{	
		$_subject = isset($_POST["formSubject"]) ? filter_var($_POST['formSubject'], FILTER_SANITIZE_STRING) :  null;		
		$subject = "Заявка с сайта Rem&Coil: " . $_subject ;				
		
		$message = "Информация:				
		Имя:            ".(isset($_POST["name"]) ?             filter_var($_POST['name'],            FILTER_SANITIZE_STRING) :  null)."	
		Фамилия:            ".(isset($_POST["secondname"]) ?             filter_var($_POST['secondname'],            FILTER_SANITIZE_STRING) :  null)."	
		Компания:            ".(isset($_POST["company"]) ?             filter_var($_POST['company'],            FILTER_SANITIZE_STRING) :  null)."
		E-mail:            ".(isset($_POST["email"]) ?             filter_var($_POST['email'],            FILTER_SANITIZE_STRING) :  null)." 				
		Тема:            ".(isset($_POST["subject"]) ?             filter_var($_POST['subject'],            FILTER_SANITIZE_STRING) :  null)." 				
		Сообщение:            ".(isset($_POST["message"]) ?             filter_var($_POST['message'],            FILTER_SANITIZE_STRING) :  null)." 				
		Заявка: 				$_subject 
		Время заявки:       ".date("Y-m-d H:i:s")."
		";
		
		$headers =  "From: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Reply-To: info@" . $_SERVER['HTTP_HOST']. "\r\n" .
		"Content-type: text/plain; charset=\"utf-8\"" . "\r\n" .
		"X-Mailer: PHP/" . phpversion();

		if ( mail(DESTINATION, $subject, $message, $headers) && mail(DESTINATION2, $subject, $message, $headers) )
        ok();
		else
        not_ok("Ошибка. Возможно функция mail отключена. Обратитесь к хостинг-провайдеру.");		
	}

	elseif ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		not_ok("Все поля обязательны к заполнению");
	}		
	
?>