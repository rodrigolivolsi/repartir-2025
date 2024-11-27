package ar.com.grupoesfera.repartir.uitest;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import javax.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;


@Configuration
@Profile("uiTest")
public class WebDriverSupport {

    @Value("${CHROME_OPTIONS:}")
    String[] environmentalOptions;

    @PostConstruct
    public void downloadWebDriver() {

        WebDriverManager.chromedriver()
                .clearDriverCache()
                .setup();
    }

    @Bean
    public WebDriver buildWebDriver() {

        var options = new ChromeOptions();
        options.addArguments("start-maximized");
        options.addArguments("--remote-allow-origins=*");
        options.addArguments(environmentalOptions);

        return new ChromeDriver(options);
    }
}
