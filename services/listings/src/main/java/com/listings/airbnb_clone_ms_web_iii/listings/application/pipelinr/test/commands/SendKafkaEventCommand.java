package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.test.commands;

import an.awesome.pipelinr.Command;

public class SendKafkaEventCommand implements Command<String> {

    public int userId;
    public String eventType;
    public String eventData;

    public SendKafkaEventCommand(String eventType, String eventData) {
        this.eventType = eventType;
        this.eventData = eventData;
    }
}
