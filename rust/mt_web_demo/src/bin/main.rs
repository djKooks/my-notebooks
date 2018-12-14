extern crate server_test;
use server_test::ThreadPool;

use std::fs::File;
use std::io::prelude::*;
use std::net::TcpListener;
use std::net::TcpStream;

use std::thread;
use std::time::Duration;

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let stream = stream.unwrap();
        println!("connected");
        let pool = ThreadPool::new(4);
            // handle_connection(stream); 
        pool.execute( || {
            handle_connection(stream); 
        });
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 512];
    stream.read(&mut buffer).unwrap();
    // println!("Request: {}", String::from_utf8_lossy(&buffer[..]));

    let get = b"GET / HTTP/1.1\r\n";
    let sleep = b"GET /sleep HTTP/1.1\r\n";

    let (status_line, filename) = if buffer.starts_with(get) {
        ("HTTP/1.1 200 OK\r\n\r\n", "tpl/index.html")
    } else if buffer.starts_with(sleep) {
        thread::sleep(Duration::from_secs(5));
        ("HTTP/1.1 200 OK\r\n\r\n", "tpl/index.html")
    } else {
        ("HTTP/1.1 404 NOT FOUND\r\n\r\n", "tpl/404.html")
    };

    let mut file = File::open(filename).unwrap();
    let mut html_as_content = String::new();

    file.read_to_string(&mut html_as_content).unwrap();

    let response = format!("{}{}", status_line, html_as_content);
    stream.write(response.as_bytes()).unwrap();
    stream.flush().unwrap();
}
