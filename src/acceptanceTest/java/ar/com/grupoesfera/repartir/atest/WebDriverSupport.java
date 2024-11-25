package ar.com.grupoesfera.repartir.atest;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

@Configuration
@Profile("acceptanceTest")
public class WebDriverSupport {

    private WebDriver driver;

    @Value("${CHROME_OPTIONS:}")
    String[] environmentalOptions;

    @PostConstruct
    public void start() {

        WebDriverManager.chromedriver()
                .clearDriverCache()
                .setup();

        var options = new ChromeOptions();
        options.addArguments("start-maximized");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments(environmentalOptions);
        driver = new ChromeDriver(options);
    }

    @Bean
    public WebDriver getWebDriver() {

        return driver;
    }

    @PreDestroy
    public void stop() {

        driver.quit();
    }
}
