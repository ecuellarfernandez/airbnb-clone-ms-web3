package com.listings.airbnb_clone_ms_web_iii.listings.infrastructure.config;

import an.awesome.pipelinr.*;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PipelinrConfiguration {

    @Bean
    public Pipeline pipeline(
            ObjectProvider<Command.Handler> commandHandlers,
            ObjectProvider<Notification.Handler> notificationHandlers,
            ObjectProvider<Command.Middleware> middlewares
    ) {
        CommandHandlers commandHandlersAdapter = () -> commandHandlers.stream();
        NotificationHandlers notificationHandlersAdapter = () -> notificationHandlers.stream();
        Command.Middlewares middlewaresAdapter = () -> middlewares.orderedStream();

        return new Pipelinr()
                .with(commandHandlersAdapter)
                .with(notificationHandlersAdapter)
                .with(middlewaresAdapter);
    }

}
