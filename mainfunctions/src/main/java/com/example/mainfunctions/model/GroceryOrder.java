package com.example.mainfunctions.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "groceryorder")
public class GroceryOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOrder;

    @JoinColumn(name = "idUser", referencedColumnName = "idUser")
    @ManyToOne
    private User user;

    @Column(name = "orderNotes")
    private String notes;

    @Column(name = "orderRate")
    private Integer rate;

    @Column(name = "orderFeedback")
    private String feedback;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinTable(name = "order_item",
            joinColumns = @JoinColumn(name = "idOrder", referencedColumnName = "idOrder"),
            inverseJoinColumns = @JoinColumn(name = "idItem", referencedColumnName = "idItem"))
    private List<Item> items;

}
