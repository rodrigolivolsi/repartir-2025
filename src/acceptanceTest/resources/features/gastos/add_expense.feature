Feature: Add an expense to a group

  Rule: Expenses can be added to a group

    Scenario: Add an expense to a group
      Given a group with 2500 total
      When adding an expense for 750
      Then group expenses should total "3.250"
