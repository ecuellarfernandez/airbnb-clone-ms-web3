package com.listings.airbnb_clone_ms_web_iii.listings.application.pipelinr.listing.commands;

import an.awesome.pipelinr.Command;
import com.listings.airbnb_clone_ms_web_iii.listings.application.dto.response.ListingDetailDTO;
import com.listings.airbnb_clone_ms_web_iii.listings.application.port.ListingServicePort;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleEvents;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.classifiers.kafka.producible.ProducibleTopics;
import com.listings.airbnb_clone_ms_web_iii.listings.domain.integration_events.BaseIntegrationEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;


@Component
public class CreateListingCommandHandler implements Command.Handler<CreateListingCommand, ListingDetailDTO> {

    private final ListingServicePort listingService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public CreateListingCommandHandler(ListingServicePort listingService,
                                       KafkaTemplate<String, Object> kafkaTemplate) {
        this.listingService = listingService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public ListingDetailDTO handle(CreateListingCommand createListingCommand) {
        // Ejecutar lógica de creación
        ListingDetailDTO listing = listingService.create(createListingCommand.createListingDTO);

        // Publicar evento de integración
        String placeholderId = "0";
        BaseIntegrationEvent<ListingDetailDTO> event = new BaseIntegrationEvent<>(
                listing,
                placeholderId,
                ProducibleEvents.LISTING_CREATED
        );
        kafkaTemplate.send(ProducibleTopics.LISTING_EVENTS, event);

        return listing;
    }

}
