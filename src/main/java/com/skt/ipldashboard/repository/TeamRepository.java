package com.skt.ipldashboard.repository;

import com.skt.ipldashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {
    Team findByTeamName(String teamName);
}
