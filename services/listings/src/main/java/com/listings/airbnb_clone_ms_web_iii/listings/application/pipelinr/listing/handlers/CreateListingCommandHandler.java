package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.handlers;

import an.awesome.pipelinr.Command;
import an.awesome.pipelinr.Pipeline;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands.CreateListingCommand;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleEvents;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleTopics;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.integration_events.BaseIntegrationEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.transaction.annotation.Transactional;


public class CreateListingCommandHandler implements Command.Handler<CreateListingCommand, ListingDetailDTO> {

    private final ListingServicePort listingService;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final Pipeline pipeline;

    public CreateListingCommandHandler(ListingServicePort listingService,
                                       KafkaTemplate<String, Object> kafkaTemplate,
                                       Pipeline pipeline) {
        this.listingService = listingService;
        this.kafkaTemplate = kafkaTemplate;
        this.pipeline = pipeline;
    }

    @Override
    public ListingDetailDTO handle(CreateListingCommand createListingCommand) {

        //Aqui va a ir la logica de creacion
        ListingDetailDTO listing = listingService.create(createListingCommand.createListingDTO);
        String placeholderId = "0";

        BaseIntegrationEvent<ListingDetailDTO> event = new BaseIntegrationEvent<ListingDetailDTO>(listing, placeholderId, ProducibleEvents.LISTING_CREATED);
        kafkaTemplate.send(ProducibleTopics.LISTING_EVENTS, event);
        return listing;
    }


}
