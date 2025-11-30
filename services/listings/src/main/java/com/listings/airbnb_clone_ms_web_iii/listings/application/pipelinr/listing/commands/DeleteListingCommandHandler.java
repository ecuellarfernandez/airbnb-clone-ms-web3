package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Voidy;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleEvents;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleTopics;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.integration_events.BaseIntegrationEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DeleteListingCommandHandler implements Command.Handler<DeleteListingCommand, Voidy> {

    private final ListingServicePort listingService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public DeleteListingCommandHandler(ListingServicePort listingService,
                                       KafkaTemplate<String, Object> kafkaTemplate) {
        this.listingService = listingService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public Voidy handle(DeleteListingCommand command) {
        UUID listingId = command.getListingId();
        listingService.delete(listingId);

        String placeholderId = "0";
        BaseIntegrationEvent<UUID> event = new BaseIntegrationEvent<>(
                listingId,
                placeholderId,
                ProducibleEvents.LISTING_DELETED
        );
        kafkaTemplate.send(ProducibleTopics.LISTING_EVENTS, event);

        return new Voidy();
    }
}

